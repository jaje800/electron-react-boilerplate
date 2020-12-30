import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WorkingSpace } from '../components/GreenRoomComponents/WorkingSpace';
import { FirstTxt } from '../assets/LolaText';
import { useHistory } from 'react-router-dom';
import { ImportantMessage } from '../components/GreenRoomComponents/ImportantMessage';
import { Sidebar } from '../components/GreenRoomComponents/SidebarComponents/Sidebar';
import { WorkingContainer } from '../components/GreenRoomComponents/WorkingContainer';
import { SidebarImages } from '../components/GreenRoomComponents/SidebarComponents/SidebarImages';
import { networkConditionsSelector } from '../controllers/NetworkConditionsController';

import { GREEN_ROOM_PATH, BLUE_ROOM_PATH } from '../routes';
import { LogoBox } from '../components/LogoBox';
import SvgLolaWithStars from '../assets/images/SvgModified/SvgLolaWithStars';
import { getAllMicrophones, getAllSpeakers } from '../utils/AudioDeviceUtils';

function NetworkScan() {
  const networkConditions = useSelector(networkConditionsSelector);
  const history = useHistory();
  //window.localStorage.clear();

  useEffect(() => {
    if (networkConditions != null) {
      if (
        Object.keys(getAllMicrophones()).length === 0 ||
        Object.keys(getAllSpeakers()).length === 0
      )
        history.push(GREEN_ROOM_PATH);
      else history.push(BLUE_ROOM_PATH);
    }
  }, [networkConditions, history]);

  return (
    <>
      <Sidebar>
        <SidebarImages />
      </Sidebar>
      <WorkingContainer>
        <LogoBox top="2rem">
          <SvgLolaWithStars w="55vw" />
        </LogoBox>
        <WorkingSpace>
          <ImportantMessage>{FirstTxt.scanningInternet}</ImportantMessage>
        </WorkingSpace>
      </WorkingContainer>
    </>
  );
}
export default NetworkScan;
