import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  start_audio_metering,
  remove_audio_process,
  acquire_engine,
  release_engine,
  audio_client_type,
} from '../ipc/AudioClient';

const AudioMeterController = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {

    let monitorId;
    let intervalId;
    let canceled = false;

    async function start() {
      acquire_engine();
      monitorId = await start_audio_metering('all', 'rms');
      if (canceled) {
        remove_audio_process(monitorId);
        release_engine();
      } else
        intervalId = setInterval(() => {
          dispatch({
            type: 'MONITOR_LEVELS_REQUESTED',
            payload: {
              monitorId
            }
          });
        }, 100);
    }

    if (audio_client_type() !== 'none') {
      start();

      return () => {
        canceled = true;
        if (intervalId != null) {
          remove_audio_process(monitorId);
          release_engine();
          clearInterval(intervalId);
        }
      };
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};
export default AudioMeterController;
