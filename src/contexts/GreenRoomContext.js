import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { defaultMicrophone, defaultSpeaker } from '../utils/AudioDeviceUtils';

export const GreenRoomContext = createContext();
const BLINK_INTERVAL = 15000; //15 sec

const GreenRoomContextProvider = ({ children }) => {
  const availableDevices = useSelector((state) => state.availableAudioDevices);
  const [shownNetwork, setShownNetwork] = useState(false);
  const [warnedWifi, setWarnedWifi] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState(
    defaultMicrophone(availableDevices) != null
  );
  const [selectedSpeaker, setSelectedSpeaker] = useState(
    defaultSpeaker(availableDevices) != null
  );
  const [nextSubComponent, setNextSubComponent] = useState(null);
  const [blink, setBlink] = useState(false);

  // creates a GreenRoom timer that toggles state every 15 seconds
  // and resets the state for 2 second - gives it a more natural blink within the svg animation duration
  // used to animate the eyes of the network emoticons
  useEffect(() => {
    const interval = setInterval(() => {
      const blinktimer = setTimeout(() => {
        setBlink((prevState) => !prevState);
      }, 2000); //update the blink state for 2 second
      setBlink((prevState) => !prevState);
      return () => clearTimeout(blinktimer);
    }, BLINK_INTERVAL); //cycles through every BLINK_INTERVAL seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectedMicrophone(defaultMicrophone(availableDevices) != null);
    setSelectedSpeaker(defaultSpeaker(availableDevices) != null);
  }, [availableDevices]);

  return (
    <GreenRoomContext.Provider
      value={{
        blink,
        shownNetwork,
        warnedWifi,
        selectedMicrophone,
        selectedSpeaker,
        nextSubComponent,
        setBlink,
        setShownNetwork,
        setWarnedWifi,
        setSelectedMicrophone,
        setSelectedSpeaker,
        setNextSubComponent,
      }}
    >
      {children}
    </GreenRoomContext.Provider>
  );
};
export default GreenRoomContextProvider;
