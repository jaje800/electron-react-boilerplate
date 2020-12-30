import React, { useEffect, useRef, useCallback, useContext } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import defaultRoomModel from '../../assets/models/DefaultRoom.gltf';
import defaultLghtsModel from '../../assets/models/DefaultLights.gltf';
import {
  getInfoForParticipantsStatus,
  getRoomModel,
} from '../../reducers/AudioSessionReducer';
import Room3D from './Room3D';
import { UserContext } from '../../contexts/UserContext';
import { get_participant_audio_info } from '../../ipc/AudioClient';

const BlueContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  user-select: none;
`;

function getMousePos(el, e) {
  return {
    x: ((e.clientX - el.offsetLeft) * 2) / el.offsetWidth - 1,
    y: ((el.offsetTop - e.clientY) * 2) / el.offsetHeight + 1,
  };
}

function getRoomModels(userInfo) {
  let defaultRoom =
    userInfo &&
    userInfo.serviceUserInfo &&
    userInfo.serviceUserInfo.account_info &&
    userInfo.serviceUserInfo.account_info.default_room;
  let model = defaultRoom && defaultRoom.model;
  let lights = defaultRoom && defaultRoom.lighting;

  return {
    model: model || defaultRoomModel,
    lights: lights || defaultLghtsModel,
  };
}

function BlueRoom3Space({ width, height }) {
  const participants = useSelector(getInfoForParticipantsStatus);
  const { userInfo } = useContext(UserContext);
  const roomModel = useSelector(getRoomModel);
  const elRef = useRef(null);

  // basic threejs setup
  // sets the room up to the current BlueContainer dimensions
  useEffect(() => {
    let mods = getRoomModels(userInfo);
    elRef.current.room = new Room3D(elRef.current, mods.model, mods.lights);
  }, [userInfo]);

  useEffect(() => {
    if (elRef.current && roomModel) {
      let defaults = getRoomModels(userInfo);
      elRef.current.room.updateRoomModel(
        roomModel.model || defaults.model,
        roomModel.lights || defaults.lights
      );
    }
  }, [roomModel, userInfo]);

  // watch for size changes
  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      // there is a call to this when things are shutting down,
      // when elRef.current is null.  So don't generate a warning
      // when that happens.
      if (elRef.current) {
        const { width, height } = entries[0].contentRect;
        elRef.current.room.resize(width, height);
      }
    });
    observer.observe(elRef.current);
  }, []);

  // the code to monitor all participant's latency, jitter, and volume.
  useEffect(() => {
    function measure() {
      get_participant_audio_info(participants.participantId).then((info) => {
        if (elRef.current) {
          elRef.current.room.updateParticipantAudioInfo(info);
        }
      });
    }
    if (participants.participantId != null) {
      let timerId = setInterval(measure, 50);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [participants]);

  // connectors for handling mouse tracking
  const doMouseDown = useCallback((e) => {
    elRef.current.room.onMouseDown(e, getMousePos(elRef.current, e));
  }, []);

  const doMouseUp = useCallback((e) => {
    elRef.current.room.onMouseUp(e, getMousePos(elRef.current, e));
  }, []);

  const doMouseEnter = useCallback((e) => {
    elRef.current.room.onMouseEnter(e, getMousePos(elRef.current, e));
  }, []);

  const doMouseMove = useCallback((e) => {
    elRef.current.room.onMouseMove(e, getMousePos(elRef.current, e));
  }, []);

  // ensure 3d scene has the correct participants in it
  const room = elRef.current && elRef.current.room;
  room && room.validateParticipants(participants);

  return (
    <BlueContainer
      width={width}
      height={height}
      ref={elRef}
      onMouseDown={(e) => doMouseDown(e)}
      onMouseUp={(e) => doMouseUp(e)}
      onMouseEnter={(e) => doMouseEnter(e)}
      onMouseMove={(e) => doMouseMove(e)}
    />
  );
}
export default BlueRoom3Space;
