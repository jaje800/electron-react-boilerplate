import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import UnstableInternet from '../components/GreenRoomComponents/NetworkSetup/UnstableInternet';
import WifiInternet from '../components/GreenRoomComponents/NetworkSetup/WifiInternet';
//import GoodInternet from '../components/GreenRoomComponents/NetworkSetup/GoodInternet';
import NoInternet from '../components/GreenRoomComponents/NetworkSetup/NoInternet';
import { networkConditionsSelector } from '../controllers/NetworkConditionsController';
import { getNetworkRank, useOnlineStatus } from '../utils/netInfoUtils';
import { StatusBarTxt } from '../assets/LolaText';
import { GreenRoomContext } from '../contexts/GreenRoomContext';

export default function NetworkSetupController() {
  const networkConditions = useSelector(networkConditionsSelector);
  const { setShownNetwork } = useContext(GreenRoomContext);
  let isOffline = useOnlineStatus();

  // determines which components to show based on current network rank
  let rank = getNetworkRank(networkConditions);
  if (isOffline) {
    return <NoInternet />; //circumventing taskcomp routing
  } else {
    switch (rank) {
      case 0:
        return <h2>{StatusBarTxt.scanning}</h2>;
      case 1:
        return <WifiInternet />;
      case 2:
        return <UnstableInternet />;
      case 3:
        setShownNetwork(true);
        return null;
      // return <GoodInternet />;
      default:
        return null;
    }
  }
}
