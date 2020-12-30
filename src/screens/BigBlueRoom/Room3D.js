import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import simpleBoxAvatar from '../../assets/models/DefaultAvatar.gltf';
import {
  set_stream_playback_params,
  set_monitor_stream,
} from '../../ipc/AudioClient';
import { showMilliseconds } from '../../components/GreenRoomComponents/SidebarComponents/NetworkStatus.js';

class Room3D {
  constructor(ele, roomModel, lightsModel) {
    this.width = ele.clientWidth;
    this.height = ele.clientHeight;
    this.curRoomModel = roomModel;
    this.curLightsModels = lightsModel;
    this.mouseIsDown = false;
    this.mouseIsOver = false;
    this.participants = {};
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    ele.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mousePos = new THREE.Vector2();
    this.floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
    this.cameraWorldPos = new THREE.Vector3();
    this.mouseRenderVec = new THREE.Vector3();
    this.origObjPos = new THREE.Vector3();
    this.objPosForScreenX = new THREE.Vector3();
    this.objPosForScreenY = new THREE.Vector3();

    // when set true, we include our own participant
    // model in the scene.  Otherwise we don't
    this.showOurParticipant = true;

    this.loadRoomScene(roomModel, lightsModel);
  }

  appendLights(lights, children) {
    for (let child of children) {
      switch (child.type) {
        case 'Object3D':
          this.appendLights(lights, child.children);
          break;
        case 'PointLight':
        case 'DirectionalLight':
        case 'SpotLight':
          lights.push(child);
          break;
        default:
          break;
      }
    }
  }

  // this list is taken from the threejs source code, listing all
  // object types that have a non-default 'raycast' implementation.
  // The idea is that if 'raycast' is non-default, then it is something
  // that is "clickable" - and it is also likely something that can
  // cast a shadow.
  getClickable(children) {
    let clickable = [];
    for (let child of children) {
      switch (child.type) {
        case 'Line':
        case 'Mesh':
        case 'Points':
        case 'LOD':
        case 'Sprite':
        case 'SkinnedMesh':
        case 'InstancedMesh':
          clickable.push(child);
          clickable = clickable.concat(this.getClickable(child.children));
          break;
        case 'Object3D':
          clickable = clickable.concat(this.getClickable(child.children));
          break;
        default:
          break;
      }
    }
    return clickable;
  }

  castsShadows(name) {
    for (const seg of name.split(',').slice(1)) {
      if (seg.split('_')[0] === 'castshadows') return true;
    }
    return false;
  }

  receivesShadows(name) {
    for (const seg of name.split(',').slice(1)) {
      if (seg.split('_')[0] === 'receiveshadows') return true;
    }
    return false;
  }

  fixupBlender(roomGltf, lightGltf) {
    let lights = [];
    this.appendLights(lights, lightGltf.scene.children);

    // Blender light intensity is represented in watts (with
    // values around 1000) whereas gltf wants lumens (values
    // around 5) and the current Blender exporter doesn't convert.
    for (let light of lights) {
      light.intensity /= 700;
      if (this.castsShadows(light.name)) {
        light.castShadow = true;
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 130;
        light.shadow.mapSize.height = light.shadow.mapSize.width = 1024;
        light.shadow.radius = 8;
      }
    }
    roomGltf.scene.add(lightGltf.scene);

    let clickable = this.getClickable(roomGltf.scene.children);
    for (let child of clickable) {
      child.receiveShadow = true;
      child.castShadow = this.castsShadows(child.name);
    }

    return roomGltf.scene;
  }

  lookupTaggedObjects() {
    this.taggedObjects = {};
    for (let child of this.scene.children) {
      for (const seg of child.name.split(',').slice(1)) {
        let s = seg.split('_')[0];
        if (s.startsWith('id=')) {
          this.taggedObjects[s.substr(3)] = child;
          break;
        }
      }
    }
  }

  loadModel(model, fn) {
    const loader = new GLTFLoader();
    loader.load(
      model,
      (gltf) => fn(gltf),
      (xhr) => {
        if (xhr.total > 0)
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log(`An error happened\n${error.message}`);
      }
    );
  }

  loadRoomScene(roomModel, lightsModel) {
    this.roomSceneLoading = true;
    this.loadModel(roomModel, (roomGltf) => {
      if (roomGltf.scene != null) {
        this.loadModel(lightsModel, (lightsGltf) => {
          if (lightsGltf != null) {
            this.scene = this.fixupBlender(roomGltf, lightsGltf);

            this.lookupTaggedObjects();
            if ('mainroom' in this.taggedObjects) {
              this.mainRoomBBox = new THREE.Box3().setFromObject(
                this.taggedObjects['mainroom']
              );
            } else {
              this.mainRoomBBox = new THREE.Box3().setFromObject(this.scene);
            }

            if ('maincamera' in this.taggedObjects) {
              // Cinima4D tags the object itself, Blender tags a parent
              // of the object...
              let tagged = this.taggedObjects['maincamera'];
              if (tagged.children.length > 0) this.camera = tagged.children[0];
              else this.camera = tagged;

              // this is called both for first time room load
              // and as a result of "reload" (when the room changes).
              // In the second case we want to re-add whatever avatars
              // were in the previous room.
              for (let [id, part] of Object.entries(this.participants)) {
                if (this.showOurParticipant || id !== this.ourParticipantId) {
                  this.scene.add(part.model);
                }
              }

              this.roomSceneLoading = false;
              this.renderer.render(this.scene, this.camera);
            } else {
              console.error('error, room model has no cameras');
            }
          }
        });
      }
    });
  }

  getAvatarModelUrls(participant) {
    let url;
    let material;
    if (participant != null) {
      switch (participant.url) {
        case 'simple_box':
          url = simpleBoxAvatar;
          break;
        default:
          url = participant.url;
          break;
      }
      material = participant.material;
    }
    return {
      url: url || simpleBoxAvatar,
      material,
    };
  }

  // make our internal model refect the given participant info
  // (as reported by redux state changes)
  validateParticipants(participants) {
    if (this.scene == null || this.camera == null || participants == null)
      return;

    this.ourParticipantId = participants.participantId;

    // remove participants who are no longer in the session
    for (let id of Object.keys(this.participants)) {
      if (!(id in participants.participants)) {
        this.scene.remove(this.participants[id].model);
        delete this.participants[id];
      }
    }
    // add new participants
    for (let [id, participant] of Object.entries(participants.participants)) {
      if (this.showOurParticipant || id !== this.ourParticipantId) {
        if (!(id in this.participants)) {
          //add to this.participants dictionary:
          this.participants[id] = {
            participantInfo: participant,
            position: { x: 0, y: 0, z: 0 },
          };

          let avatar = this.getAvatarModelUrls(participant.avatar);

          this.loadModel(avatar.url, (model) => {
            this.participants[id].model = model.scene;
            this.participants[id].bbox = new THREE.Box3().setFromObject(
              model.scene
            );

            model.scene.participantId = id;
            if (avatar.material != null) {
              new THREE.TextureLoader().load(avatar.material, (texture) => {
                texture.flipY = false;
                let childMaterial = new THREE.MeshBasicMaterial({
                  map: texture,
                });
                let clickable = this.getClickable(model.scene.children);
                // for now, add the texture to all clickable objects...
                for (let obj of clickable) {
                  obj.material = childMaterial;
                }
                this.renderer.render(this.scene, this.camera);
              });
            }
            let clickable = this.getClickable(model.scene.children);
            for (let obj of clickable) {
              obj.clickable = true;
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
            if (!this.roomSceneLoading) {
              this.scene.add(model.scene);
              this.renderer.render(this.scene, this.camera);
            }
          });
        }
      }
    }

    // update audioProcs
    for (let id of Object.keys(this.participants)) {
      this.participants[id].audioProcId = participants.audioProcIds[id];
      this.participants[id].audioStream =
        participants.participants[id].audioStream;
      this.participants[id].streamsMeta =
        participants.participants[id].streamsMeta;
    }
    if (!this.roomSceneLoading) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize(width, height) {
    if (this.scene != null && this.camera != null) {
      this.renderer.setSize(width, height);
      this.renderer.render(this.scene, this.camera);
      this.width = width;
      this.height = height;
    }
  }

  // called frequently with updated information about
  // the audio level from, and latency and jitter to
  // each participant in the session.
  updateParticipantAudioInfo(info) {
    let changed = false;
    for (let id of Object.keys(this.participants)) {
      let obj = this.participants[id];
      if (obj.model != null && id in info) {
        let audPartInfo = info[id];
        obj.participantInfo.jitter = showMilliseconds(audPartInfo.jitter);
        obj.participantInfo.latency = showMilliseconds(audPartInfo.latency);
        let numPredictedBuffers = audPartInfo.num_predicted_buffers || 0;
        let numDoubledBuffers = audPartInfo.num_doubled_buffers || 0;
        let numHalvedBuffers = audPartInfo.num_doubled_buffers || 0;
        let vol = audPartInfo.volume;
        let xScale = obj.model.scale.x;
        let yScale = obj.model.scale.y;
        let zScale = obj.model.scale.z;

        if (
          id !== this.ourParticipantId &&
          (!audPartInfo.synced || audPartInfo.synced !== obj.synced)
        ) {
          if (audPartInfo.synced !== obj.synced) changed = true;
          obj.synced = audPartInfo.synced;
          if (!audPartInfo.synced) {
            xScale = yScale = zScale = 0.25;
          } else {
            xScale = yScale = zScale = 1.0;
          }
        } else if (numPredictedBuffers !== 0 || obj.numPredictedBuffers !== 0) {
          obj.numPredictedBuffers = numPredictedBuffers;
          if (numPredictedBuffers !== 0) {
            xScale = yScale = zScale = 0.5;
            console.log('showing numPredictedBuffers !== 0');
          }
          changed = true;
        } else if (numDoubledBuffers !== 0 || obj.numDoubledBuffers !== 0) {
          obj.numDoubledBuffers = numDoubledBuffers;
          if (numDoubledBuffers !== 0) {
            xScale = 1.25;
            console.log('showing numDoubledBuffers !== 0');
          }
          changed = true;
        } else if (numHalvedBuffers !== 0 || obj.numHalvedBuffers !== 0) {
          obj.numHalvedBuffers = numHalvedBuffers;
          if (numHalvedBuffers !== 0) {
            xScale = 0.75;
            console.log('showing numHalvedBuffers !== 0');
          }
          changed = true;
        } else {
          let gateMin = 0.2;
          let scale = vol <= gateMin ? 1.0 : 1 + (vol - gateMin) / 5;
          if (Math.abs(obj.model.scale.x - scale) > 0.01) {
            xScale = yScale = zScale = scale;
            changed = true;
          }
        }
        obj.model.scale.set(xScale, yScale, zScale);
      }
    }
    if (changed) this.renderer.render(this.scene, this.camera);
  }

  updateRoomModel(roomModel, lightsModel) {
    if (
      roomModel !== this.curRoomModel ||
      lightsModel !== this.curLightsModels
    ) {
      this.curRoomModel = roomModel;
      this.curLightsModels = lightsModel;
      this.loadRoomScene(roomModel, lightsModel);
    }
  }

  // ok, there are still some assumptions built into this about how
  // other parts of the system work.  But this routine is given
  // the number of audio channels in the source audio, how many of
  // those channels are "stereo pairs", how many audio output channels
  // there are and the "panX" and "volumeZ" values that are computed
  // from the mouse position.  It is responsible for returning
  // an array of numbers, each in the range of 0 to 1, where each
  // one is an audio weight to be applied.  Here are the
  // still-just-built-in assumptions.
  //
  //  1) we only support the two cases of there being 1 or 2
  //    output channels (so no surround sound, etc...)
  //  2) if there are two output channels, then for each
  //    source stereo pair, each of the two source channels
  //    only plays to a single (its matching) destination
  //    channel.  Each mono channel in the source plays
  //    to both destination sources.
  //  3) if there is a single output channel, then each
  //    source would play at volume 1 to that output,
  //    but then there isn't a reason to be running this,
  //    So, it is ok if this routine always assumes there
  //    are two output channels.
  buildPannedWeights(
    numChannels,
    numStereoPairs,
    monoPanX,
    stereoPanX,
    volumeZ
  ) {
    let wa = [];
    let chanCount = 0;
    let stereoLeftWeight = Math.min(1 - stereoPanX, 1.0) * volumeZ;
    let stereoRightWeight = Math.min(1 + stereoPanX, 1.0) * volumeZ;
    let monoToLeftOutWeight = Math.sqrt(1 - monoPanX) * volumeZ; //left channel -- square root of inverse * volume
    let monoToRightOutWeight = Math.sqrt(monoPanX) * volumeZ; //right channel -- square root * volume
    //for stereo sources:
    for (let spCount = 0; spCount < numStereoPairs; spCount++) {
      wa.push(stereoLeftWeight);
      wa.push(stereoRightWeight);
      chanCount += 2;
    }
    //for mono sources:
    while (chanCount < numChannels) {
      wa.push(monoToLeftOutWeight);
      wa.push(monoToRightOutWeight);
      chanCount += 1;
    }
    return wa;
  }

  // given this.mousePos has been set, and
  // given the current position of the camera,
  // set this.mouseRenderVec to a unit length
  // vector that points from the camera's position
  // to where this.mousePos is in the (virtual)
  // render plane
  mousePosToRenderPlanePos() {
    this.mouseRenderVec.x = this.mousePos.x;
    this.mouseRenderVec.y = this.mousePos.y;
    this.mouseRenderVec.z = 0.5;
    this.mouseRenderVec.unproject(this.camera);
    this.camera.getWorldPosition(this.cameraWorldPos);
    this.mouseRenderVec.sub(this.cameraWorldPos).normalize();
  }

  // once this.mousePos has been set to the
  // <x,y> position on screen for where the
  // mouse pointer is, and given that you
  // have previously set an initial object
  // that has been selected, this returns the
  // {x, y, z} that the object should be moved
  // to corresponding to the current mousePos
  mousePosToFloorPos() {
    this.mousePosToRenderPlanePos();

    const pt = this.raycaster.ray.intersectPlane(
      this.floorPlane,
      this.mouseRenderVec
    );
    if (pt != null) {
      // if the vector from the camera along the direction
      // of this.mouseRenderVec intersects the floor then
      // 'pt' is the <x,0,z> point where it intersected
      const cp = this.cameraWorldPos;
      let ptUnderCamera = new THREE.Vector3(cp.x, 0, cp.z);
      let distAlongFloor = ptUnderCamera.distanceTo(pt);
      let slope = this.cameraWorldPos.y / distAlongFloor;
      let distFromFloorHitToNewObjPos = this.origHitPt.y / slope;
      let scalar = distFromFloorHitToNewObjPos / distAlongFloor;
      let newX = pt.x + (ptUnderCamera.x - pt.x) * scalar;
      let newZ = pt.z + (ptUnderCamera.z - pt.z) * scalar;

      if (this.hitParticipant in this.participants) {
        let bbox = this.participants[this.hitParticipant].bbox;
        if (newX + bbox.min.x < this.mainRoomBBox.min.x)
          newX = this.mainRoomBBox.min.x - bbox.min.x;
        if (newX + bbox.max.x > this.mainRoomBBox.max.x)
          newX = this.mainRoomBBox.max.x - bbox.max.x;
        if (newZ + bbox.min.z < this.mainRoomBBox.min.z)
          newZ = this.mainRoomBBox.min.z - bbox.min.z;
        if (newZ + bbox.max.z > this.mainRoomBBox.max.z)
          newZ = this.mainRoomBBox.max.z - bbox.max.z;
      }
      return {
        x: newX,
        y: this.origObjPos.y,
        z: newZ,
      };
    }
  }

  findRootObject(object) {
    while (object.parent != null && object.parent !== this.scene) {
      object = object.parent;
    }
    return object;
  }

  objRenderPosToScreenPos(object) {
    //we want X to come from the middle of the object
    //and Y to come from the top of the boundingBox
    object.getWorldPosition(this.objPosForScreenX);
    let bbox = new THREE.Box3().setFromObject(object);
    this.objPosForScreenY = bbox.max;
    this.objPosForScreenX = this.objPosForScreenX.clone();
    this.objPosForScreenY = this.objPosForScreenY.clone();
    this.objPosForScreenX.project(this.camera);
    this.objPosForScreenY.project(this.camera);
    this.objPosForScreenX.x =
      this.objPosForScreenX.x * (this.width / 2) + this.width / 2;
    this.objPosForScreenY.y =
      -(this.objPosForScreenY.y * (this.height / 2)) + this.height / 2;
    return { x: this.objPosForScreenX.x, y: this.objPosForScreenY.y };
  }

  addObjLabel(participantInfo, objScreenPos) {
    var aLabel = document.createElement('div');
    aLabel.setAttribute('id', 'avatarLabel');
    aLabel.style.position = 'absolute';
    aLabel.style.width = 100;
    aLabel.style.height = 100;
    let desc = participantInfo.displayName;
    if (participantInfo.id === this.ourParticipantId) desc += ' (yourself)';
    else {
      if (participantInfo.synced) {
        desc +=
          '<br />' +
          'latency: ' +
          participantInfo.latency +
          ' jitter: ' +
          participantInfo.jitter;
        if (participantInfo.isWifi) {
          desc += '<br />on wifi :(';
        }
      } else desc += '<br />lost sync';
    }
    aLabel.innerHTML = desc;
    aLabel.style.top = objScreenPos.y + objScreenPos.y / 15 + 'px';
    aLabel.style.left = objScreenPos.x + 'px';
    document.body.appendChild(aLabel);
  }

  removeObjLabel() {
    var element = document.getElementById('avatarLabel');
    element.parentNode.removeChild(element);
  }

  onMouseDown(e, pos) {
    this.mouseIsDown = true;
    this.altKeyWasDown = e.altKey;
    this.cntrlKeyWasDown = e.cntrlKey;
    this.mousePos.x = pos.x;
    this.mousePos.y = pos.y;
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    if (intersects.length > 0) {
      let obj = this.findRootObject(intersects[0].object);
      if (obj.participantId != null) {
        this.hitParticipant = obj.participantId;
        obj.getWorldPosition(this.origObjPos);
        this.mousePosToRenderPlanePos();
        this.origHitPt = this.mouseRenderVec.clone();
        let bbox = new THREE.Box3().setFromObject(obj);
        this.raycaster.ray.intersectBox(bbox, this.origHitPt);
        this.origObject = obj;
      }
    }
    e.stopPropagation();
  }

  onMouseUp(e, pos) {
    if (this.mouseIsDown) {
      this.mouseIsDown = false;
      this.mousePos.x = pos.x;
      this.mousePos.y = pos.y;
      this.origObject = undefined;
      e.stopPropagation();
    }
  }

  onMouseEnter(e, pos) {
    this.mouseIsDown = (e.buttons & 1) !== 0;
    if (this.mouseIsDown) {
      this.mousePos.x = pos.x;
      this.mousePos.y = pos.y;
      e.stopPropagation();
    }
  }

  onMouseMove(e, pos) {
    if (!this.roomSceneLoading) {
      this.mousePos.x = pos.x;
      this.mousePos.y = pos.y;
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        let obj = this.findRootObject(intersects[0].object);
        // console.log('mousedown', obj);
        if (obj.participantId != null) {
          let objScreenPos = this.objRenderPosToScreenPos(obj);
          this.hitParticipant = obj.participantId;
          let participantInfo = this.participants[this.hitParticipant]
            .participantInfo;
          let participantJitter;
          let participantLatency;
          if (!this.mouseIsOver) {
            this.addObjLabel(participantInfo, objScreenPos);
            participantJitter = participantInfo.jitter;
            participantLatency = participantInfo.Latency;
            this.mouseIsOver = true;
          }
          //update if avatar is dragged, latency updates, or jitter updates
          if (
            this.mouseIsDown ||
            participantJitter !== participantInfo.jitter ||
            participantLatency !== participantInfo.latency
          ) {
            this.removeObjLabel();
            this.addObjLabel(participantInfo, objScreenPos);
          }
        } else {
          if (this.mouseIsOver && !this.mouseIsDown) {
            this.removeObjLabel();
            this.mouseIsOver = false;
          }
        }
        e.stopPropagation();
      }
    }
    if (this.mouseIsDown) {
      this.mousePos.x = pos.x;
      this.mousePos.y = pos.y;
      if (this.origObject != null) {
        let floorPos = this.mousePosToFloorPos();
        if (floorPos != null) {
          this.origObject.position.set(floorPos.x, floorPos.y, floorPos.z);
          if (this.hitParticipant in this.participants) {
            // some code to compute left/right balance and volume
            // based on floorPos.x and floorPos.z

            let roomWidth = this.mainRoomBBox.max.x - this.mainRoomBBox.min.x;
            let roomDepth = this.mainRoomBBox.max.z - this.mainRoomBBox.min.z;

            let monoPanX = floorPos.x / roomWidth + 0.5;
            let volumeZ = floorPos.z / roomDepth + 0.5;
            let stereoPanX = 2 * (floorPos.x / roomWidth);

            let channelOneWeight = 0.5;
            let channelTwoWeight = 0.5;
            //assuming stereo:
            if (
              monoPanX >= 0 &&
              monoPanX <= 1 &&
              volumeZ >= 0 &&
              volumeZ <= 1
            ) {
              channelOneWeight = Math.sqrt(1 - monoPanX) * volumeZ; //left channel -- square root of inverse * volume
              channelTwoWeight = Math.sqrt(monoPanX) * volumeZ; //right channel -- square root * volume
            }

            if (this.hitParticipant === this.ourParticipantId) {
              // audio-core call to set our own (monitored) audio params
              set_monitor_stream(channelOneWeight, channelTwoWeight);
            } else {
              // audio-core call to set a generic participant's audio params
              let part = this.participants[this.hitParticipant];
              let audioStreamId = part.audioStream;
              let audioProcId = part.audioProcId;
              if (audioStreamId != null && audioProcId != null) {
                let meta = part.streamsMeta[audioStreamId];
                let numChannels = meta.num_channels;
                let numStereoPairs = meta.num_stereo_pairs;
                let params = {
                  type: 'update_route_weights',
                  route_weights: this.buildPannedWeights(
                    numChannels,
                    numStereoPairs,
                    monoPanX,
                    stereoPanX,
                    volumeZ
                  ),
                };
                set_stream_playback_params(audioProcId, params);
              }
            }
            this.participants[this.hitParticipant].position = floorPos;
          }
          this.renderer.render(this.scene, this.camera);
        } else console.log("doesn't hit the floor");
      }
      e.stopPropagation();
    }
  }
}
export default Room3D;
