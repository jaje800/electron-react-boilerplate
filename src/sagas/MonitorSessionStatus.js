import { put, select } from 'redux-saga/effects';
import {
  getInfoForStatusCall,
  getStatus,
  getInfoForParticipantsStatus,
  getRoomModel,
} from '../reducers/AudioSessionReducer';
import {
  add_remote_participant,
  create_audio_decoder,
  remove_audio_process,
  remove_remote_participant,
} from '../ipc/AudioClient';
import { getBaseUrl } from '../apis/ApiService';
import { sessionStatus } from '../apis/SynchronicityApis';

let createParticipant = (info) => {
  let p = {
    id: info.participant_id,
    displayName: info.display_name,
    region: info.region,
    localPort: info.local_port,
    localAddrs: [],
    streamsMeta: info.streams_meta,
    isWifi: info.network_type === 'wifi',
    avatar: info.avatar,
  };
  if (Array.isArray(info.audio_streams) && info.audio_streams.length > 0) {
    let s = info.audio_streams[0];
    if (typeof s === 'string') p.audioStream = s;
  }
  if (
    typeof info.udp_ip_addr === 'string' &&
    typeof info.udp_port === 'number'
  ) {
    p.udpIpAddr = info.udp_ip_addr;
    p.udpPort = info.udp_port;
  }
  if (Array.isArray(info.local_addrs)) {
    info.local_addrs.forEach((localAddr) => {
      if (
        typeof localAddr.addr === 'string' &&
        typeof localAddr.masked === 'string'
      )
        p.localAddrs.push({
          addr: localAddr.addr,
          masked: localAddr.masked,
        });
    });
  }
  return p;
};

let computeAddrAndPort = (remoteParticipant, ourselves) => {
  if (ourselves.region !== remoteParticipant.region) {
    // cross region, use the service url
    let port;
    let url = new URL(getBaseUrl());
    if (typeof url.port === 'string' && url.port !== '')
      port = parseInt(url.port);
    else if (url.protocol === 'https') port = 443;
    else port = 80;
    return {
      addr: url.host,
      port,
    };
  }

  if (ourselves.udpIpAddr === remoteParticipant.udpIpAddr) {
    // remoteParticipant is behind the same NAT we are,
    // so is likely on one of our local networks.
    // look for a match in the available local addrs.
    // "masked" is the local IP address masked (and-ed) by
    // the CIDR block/mask.
    for (let our_la of ourselves.localAddrs) {
      for (let remote_la of remoteParticipant.localAddrs) {
        if (our_la.masked === remote_la.masked) {
          return {
            addr: remote_la.addr,
            port: remoteParticipant.udpPort,
          };
        }
      }
    }
  }

  // the more typical case.  remoteParticipant is in on our
  // local network, but is in our same aws region
  return {
    addr: remoteParticipant.udpIpAddr,
    port: remoteParticipant.udpPort,
  };
};

// when participants are first added we set their audio to "normal"
// - so not panned left or right, louder or quieter than the raw signal.
// This routine builds a "normal" routing from whatever the source
// audio is to whatever output we are playing to.
let buildWeightedChannels = (numChannels, numStereoPairs, audioOutChannels) => {
  let oc = audioOutChannels;
  let wc = [];
  if (oc.length >= 2) {
    let chanCount = 0;
    for (let spCount = 0; spCount < numStereoPairs; spCount++) {
      wc.push({
        src: chanCount,
        dst: oc[0],
        weight: 1,
      });
      wc.push({
        src: chanCount + 1,
        dst: oc[1],
        weight: 1,
      });
      chanCount += 2;
    }

    // followed by all the mono channels
    while (chanCount < numChannels) {
      wc.push({
        src: chanCount,
        dst: oc[0],
        weight: 1,
      });
      wc.push({
        src: chanCount,
        dst: oc[1],
        weight: 1,
      });
      chanCount += 1;
    }
  } else if (oc.length === 1) {
    for (var i = 0; i < numChannels; i++) {
      wc.push({
        src: i,
        dst: oc[0],
        weight: 1,
      });
    }
  }
  return wc;
};

export function* monitorSessionStatus() {
  while (true) {
    let info = yield select(getInfoForStatusCall);
    let reply = yield sessionStatus(
      info.sessionId,
      info.version,
      info.authorization
    );
    if (reply.version !== info.version) {
      let participantsInfo = yield select(getInfoForParticipantsStatus);
      const {
        participantId,
        audioOut,
        sampleRate,
        audioProcIds,
      } = participantsInfo;
      let curParticipants = participantsInfo.participants;

      let roomModel = yield select(getRoomModel);
      let curModel = roomModel && roomModel.model;
      let curLights = roomModel && roomModel.lights;
      if (reply.room_model !== curModel || reply.room_lights !== curLights) {
        yield put({
          type: 'AUDIO_SESSION_UPDATE',
          payload: {
            roomModel: {
              model: reply.room_model,
              lights: reply.room_lights,
            },
          },
        });
      }

      let newParticipants = {};
      if (reply.participants != null) {
        reply.participants.forEach((p) => {
          let part = createParticipant(p);
          newParticipants[part.id] = part;
        });
      }

      // curParticipants is everyone we think is in the session.
      // newParticipants is everyone the service thinks is in the session.
      //
      // figure out who/what has been added/removed.  But... we can't
      // do anything with the participants until the service reports
      // us as a participant because we need to know our own (post-NAT)
      // IP address.  Although we have already told the service we
      // want to join, it is possible to get answers back from the
      // the service that don't yet have our own participant listed.

      if (reply.participants == null || participantId in newParticipants) {
        let participantsAdded = {};
        let audioAdded = {};
        let audioRemoved = {};
        let participantsRemoved = {};

        for (let [id, newPart] of Object.entries(newParticipants)) {
          if (id in curParticipants) {
            // participant was, and still is, in the session,
            // check to see if their audio changed
            let curPart = curParticipants[id];
            if (newPart.audioStream !== curPart.audioStream) {
              if (curPart.audioStream != null) audioRemoved[id] = curPart;
              if (newPart.audioStream != null) audioAdded[id] = newPart;
            }
          } else {
            // participant was not in curParticipants
            // add the participant, and if they have
            // audio add the audio
            participantsAdded[id] = newPart;
            if (newPart.audioStream != null) audioAdded[id] = newPart;
          }
        }

        for (let [id, curPart] of Object.entries(curParticipants)) {
          if (!(id in newParticipants)) {
            // participant is no longer in the session
            participantsRemoved[id] = curPart;
            if (curPart.audioStream != null) audioRemoved[id] = curPart;
          }
        }

        // tell audio-core about all new, remote participants
        let ourselves = newParticipants[participantId];
        for (let [id, part] of Object.entries(participantsAdded)) {
          if (id !== participantId) {
            let addrAndPort = computeAddrAndPort(part, ourselves);
            add_remote_participant({
              localParticipantId: participantId,
              remoteParticipantId: id,
              remoteParticipantIpOrHost: addrAndPort.addr,
              remoteParticipantPort: addrAndPort.port,
              remoteParticipantName: part.displayName,
              remoteParticipantNetworkType: part.isWifi ? 'wifi' : 'ethernet',
            });
          }
        }

        // turn on all new remote audio streams
        for (let [id, part] of Object.entries(audioAdded)) {
          if (id !== participantId) {
            let meta = part.streamsMeta[part.audioStream];
            let dec_id = yield create_audio_decoder({
              deviceId: audioOut.deviceId,
              weightedChannels: buildWeightedChannels(
                meta.num_channels,
                meta.num_stereo_pairs,
                audioOut.channels
              ),
              localParticipantId: participantId,
              remoteParticipantId: id,
              remoteParticipantName: part.displayName,
              streamId: part.audioStream,
              sampleRate,
              numStereoPairs: parseInt(meta.num_stereo_pairs),
              framesPerEncodedPacket: Number(meta.frames_per_packet),
            });
            audioProcIds[id] = dec_id;
          }
        }

        // turn off all audio streams that have stopped
        for (let [id] of Object.entries(audioRemoved)) {
          if (id !== participantId && id in audioProcIds) {
            remove_audio_process(audioProcIds[id]);
            delete audioProcIds[id];
          }
        }

        // remove participants who have left the session
        for (let [id] of Object.entries(participantsRemoved)) {
          if (id !== participantId) {
            remove_remote_participant({
              localParticipantId: participantId,
              remoteParticipantId: id,
            });
          }
        }

        yield put({
          type: 'AUDIO_SESSION_UPDATE',
          payload: {
            version: reply.version,
            participants: newParticipants,
            audioProcIds,
          },
        });
      } else {
        yield put({
          type: 'AUDIO_SESSION_UPDATE',
          payload: {
            version: reply.version,
          },
        });
      }
      if (reply.state === 'stopped') {
        yield put({
          type: 'AUDIO_SESSION_UPDATE',
          payload: {
            status: 'stopped',
          },
        });
      }
    }

    // if we are still running the session, re-issue
    // the long-poll status call
    let status = yield select(getStatus);
    if (status !== 'running') break;
  }
}
