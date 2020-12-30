import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { BLUE_ROOM_PATH } from '../routes';
import NetworkSetupController from '../controllers/NetworkSetupController';
import BasicMicSetup from '../components/GreenRoomComponents/DeviceSetup/BasicMicSetup';
import BasicSpeakerSetup from '../components/GreenRoomComponents/DeviceSetup/BasicSpeakerSetup';
import { WorkingContainer } from '../components/GreenRoomComponents/WorkingContainer';
import { Sidebar } from '../components/GreenRoomComponents/SidebarComponents/Sidebar';
import { OnboardingChecklist } from '../components/GreenRoomComponents/SidebarComponents/OnboardingChecklist';
import NetworkConditionsController, {
  wifiOrWorseSelector,
  networkConditionsSelector,
} from '../controllers/NetworkConditionsController';
import GreenRoomContextProvider, {
  GreenRoomContext,
} from '../contexts/GreenRoomContext';
import ChecklistHeader from '../components/GreenRoomComponents/SidebarComponents/ChecklistHeader';
import ChecklistSummary from '../components/GreenRoomComponents/ChecklistSummary';
import { getNetworkRank } from '../utils/netInfoUtils';

let micTouched,
  headphTouched = false;

function GreenRoomComp() {
  const {
    shownNetwork,
    warnedWifi,
    selectedMicrophone,
    selectedSpeaker,
    nextSubComponent,
    setShownNetwork,
  } = useContext(GreenRoomContext);
  const wifiOrWorse = useSelector(wifiOrWorseSelector);

  function TaskComp() {
    //const [netChanged, setNetChanged] = useState(false);
    const networkConditions = useSelector(networkConditionsSelector);
    let rank = getNetworkRank(networkConditions);

    // when ethernet is detected, and then the network rank lowers, showNetwork had
    // not been updating, and the internet issues screens never appeared
    useEffect(() => {
      //setNetChanged(true);
      setShownNetwork(false);
      return () => {};
    }, [rank]);

    if (nextSubComponent != null) return nextSubComponent;
    if (!shownNetwork) return <NetworkSetupController />;
    if (wifiOrWorse && !warnedWifi) return <NetworkSetupController />;

    // micTouched, headphTouched
    // the basic setup device component has been accessed meaning
    // StatusBox will be called to update name as it is being typed
    // if false, statusBox will only show if a device has already been saved

    if (!selectedMicrophone) {
      micTouched = true;
      return <BasicMicSetup />;
    }

    if (!selectedSpeaker) {
      headphTouched = true;
      return <BasicSpeakerSetup />;
    }
    return <ChecklistSummary />;
  }

  return (
    <>
      <NetworkConditionsController />
      <Sidebar>
        <ChecklistHeader />
        <OnboardingChecklist
          micTouched={micTouched}
          headphTouched={headphTouched}
        />
      </Sidebar>
      <WorkingContainer>{TaskComp()}</WorkingContainer>
    </>
  );
}

function GreenRoom() {
  return (
    <GreenRoomContextProvider>
      <GreenRoomComp />
    </GreenRoomContextProvider>
  );
}
export default GreenRoom;
