import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRegionName } from '../utils/netInfoUtils';
import {
  audio_client_type,
  start_measuring_jitter,
  get_jitter,
  stop_jittering,
} from '../ipc/AudioClient';
import { getAccountDetails } from '../apis/AuthedApis';
import { requestJitter } from '../apis/SynchronicityApis';
import { getBaseUrl } from '../apis/ApiService';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    loggedIn: false,
    initialized: false,
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await getAccountDetails();

        if (data.state === 'signed_out') {
          console.log('user is signed out');
          setUserInfo({ loggedIn: false, initialized: true });
          return;
        } else if (data.state === 'signed_in') {
          console.log('user is signed in');
          setUserInfoFromServiceResponse(data.account_details);
        }

        let jitterInfo = await requestJitter();
        if (audio_client_type() !== 'none') {
          let jitterId = await start_measuring_jitter({
            synchronicityUrl: getBaseUrl(),
            id: jitterInfo.id,
          });
          await new Promise((resolve) => setTimeout(resolve, 5000));
          let jitter = await get_jitter(jitterId);
          let conditions = {
            latencyMicroseconds: jitter.mean,
            jitterMicroseconds: jitter.standard_deviation,
            is_wifi_or_worse: jitter.is_wifi_or_worse,
            region: getRegionName(jitterInfo.region),
          };
          dispatch({
            type: 'GENERIC_UPDATE_REQUESTED',
            payload: {
              networkConditions: conditions,
            },
          });
          stop_jittering(jitterId);
        } else {
          setTimeout(() => {
            let conditions = {
              latencyMicroseconds: 0,
              jitterMicroseconds: 0,
              is_wifi_or_worse: true,
              region: getRegionName(jitterInfo.region),
            };
            dispatch({
              type: 'GENERIC_UPDATE_REQUESTED',
              payload: {
                networkConditions: conditions,
              },
            });
          }, 5000);
        }
      } catch ({ errorData }) {
        console.error(errorData);
      }
    }

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    //on mount
    //set up redux to draw getLastSavedMic, dispatch to redux devicename
    //how to get the saved name out of that
    //
  }, []);

  // set local info from data returned from /account_details
  let setUserInfoFromServiceResponse = (info) => {
    if (
      info == null ||
      info.account_info == null ||
      info.account_info.id == null
    ) {
      console.error('Missing field in setUserInfoFromServiceResponse', info);
      return;
    }
    const userData = { loggedIn: true, initialized: true };
    let ainfo = info.account_info;
    userData.serviceUserInfo = info;
    userData.userId = ainfo.id;

    // it is convenient to store this in a separate useState
    // because it is common for others to watch for this
    // one
    setUserId(userData.userId);

    if (typeof ainfo.account_type === 'string') {
      userData.accountType = ainfo.account_type;
    } else {
      userData.accountType = 'free';
    }
    if (typeof ainfo.display_name === 'string') {
      userData.displayName = ainfo.display_name;
    } else {
      userData.displayName = '';
    }

    setUserInfo((prevInfo) => {
      return { ...prevInfo, ...userData };
    });
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
