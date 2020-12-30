import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { get_devices, audio_client_type, audio_reinit } from '../ipc/AudioClient';
import {
  defaultMicrophone,
  defaultSpeaker,
  updateDeviceStatus,
  getLastMicrophoneId,
  getLastSpeakerId,
} from '../utils/AudioDeviceUtils'
import { UserContext } from '../contexts/UserContext';

const AudioDeviceController = ({ children }) => {

  const dispatch = useDispatch();

  const { userId } = useContext(UserContext);

  useEffect(() => {
    async function fetch_devs() {
      let devs = await get_devices();
      updateDeviceStatus(devs, userId);
      let micId = getLastMicrophoneId();
      let speakerId = getLastSpeakerId();
      if (micId == null || !(micId in devs.input)) {
        dispatch({
          type: 'GENERIC_UPDATE_REQUESTED',
          payload: {
            selectedMicrophone: defaultMicrophone(devs)
          }
        });
      }
      if (speakerId == null || !(speakerId in devs.output)) {
        dispatch({
          type: 'GENERIC_UPDATE_REQUESTED',
          payload: {
            selectedSpeaker: defaultSpeaker(devs)
          }
        });
      }
      console.log(devs)
      dispatch({
        type: 'GENERIC_UPDATE_REQUESTED',
        payload: {
          availableAudioDevices: devs
        }
      });
    };

    if (userId != null && audio_client_type() !== 'none') {
      fetch_devs();

      navigator.mediaDevices.ondevicechange = (event) => {
        audio_reinit();
        fetch_devs();
      };
    }
  }, [userId]);

  return (
    <>
      {children}
    </>
  );

}
export default AudioDeviceController;
