import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRegionName } from '../utils/netInfoUtils';
import {
  audio_client_type,
  start_measuring_jitter,
  get_jitter,
  stop_jittering,
} from '../ipc/AudioClient';
import { requestJitter } from '../apis/SynchronicityApis';
import { getBaseUrl } from '../apis/ApiService';

export function networkConditionsSelector(state) {
  return state.networkConditions;
}

export function wifiOrWorseSelector(state) {
  return state.isWifiOrWorse;
}

const NetworkConditionsController = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let region = '';
    let jitterId;
    function measure() {
      get_jitter(jitterId).then((jitter) => {
        let conditions = {
          latencyMicroseconds: jitter.mean,
          jitterMicroseconds: jitter.standard_deviation,
          is_wifi_or_worse: jitter.is_wifi_or_worse,
          region,
        };
        dispatch({
          type: 'GENERIC_UPDATE_REQUESTED',
          payload: {
            networkConditions: conditions,
          },
        });
      });
    }

    let timerId;
    async function startWatchingNetwork() {
      let jitterInfo = await requestJitter();
      region = getRegionName(jitterInfo.region);
      jitterId = await start_measuring_jitter({
        synchronicityUrl: getBaseUrl(),
        id: jitterInfo.id,
      });
      timerId = setInterval(measure, 1000);
    }

    if (audio_client_type() !== 'none') {
      startWatchingNetwork();

      return () => {
        if (timerId != null) {
          stop_jittering(jitterId);
          clearInterval(timerId);
        }
      };
    }
  }, []);

  return <>{children}</>;
};
export default NetworkConditionsController;
