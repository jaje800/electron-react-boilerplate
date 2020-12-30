import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

export const LOGIN_PATH = 'https://signin.alpha.jamwerks.com';
export const HOME_PATH = '/';
export const BLUE_ROOM_PATH = '/TheBlueRoom';
export const NETWORK_SCAN_PATH = '/';
export const MARKETING_PAGE = 'https://www.jamwerks.com';

export const GREEN_ROOM_PATH = '/GreenRoom';
export const GREEN_ROOM_NETWORK_PATH = `${GREEN_ROOM_PATH}/NetworkSetup`;
export const GREEN_ROOM_DEVICES_PATH = `${GREEN_ROOM_PATH}/DevicesSetup`;
export const GREEN_ROOM_SAVE_MIC_PATH = `${GREEN_ROOM_PATH}/SaveMicrophone`;

const PrivateRoute = ({ children, ...otherProps }) => {
  const { userInfo } = useContext(UserContext);

  return (
    <Route
      {...otherProps}
      render={(props) => {
        // Sign in
        if (!userInfo.initialized) {
          return <></>;
        }

        if (!userInfo.loggedIn) {
          const url = `${LOGIN_PATH}?redirect=${encodeURIComponent(
            window.location
          )}`;
          window.location.replace(url);
        }

        return children;
      }}
    />
  );
};

export default PrivateRoute;
