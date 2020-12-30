import React from 'react';
import { ListVolumeItems } from './ListVolumeItems';
import AudioMeterController from '../../../controllers/AudioMeterController';
import { MicTxt } from '../../../assets/LolaText';
import Devices from './Devices';
import { SubInstruction } from '../SubInstruction';
import { DBL_BTN_PADB } from '../PageBorder';

export default function BasicMicSetup() {
  // this isn't right, I am hacking ListVolItems
  // to get it to set 'selectedDevice'
  let selectedDevice;
  let setSelectedDevice = (dev) => {
    selectedDevice = dev;
  };
  return (
    <>
      <AudioMeterController />
      <Devices
        w="48vw"
        title={MicTxt.mic1Title}
        subtitle={MicTxt.mic1Subtitle}
        padb={DBL_BTN_PADB}
        explanation={
          <>
            <SubInstruction>
              <p>{MicTxt.mic1Instructions}</p>
              <p>{MicTxt.mic1seeMeter}</p>
            </SubInstruction>
            <SubInstruction>
              <p>{MicTxt.mic1DropDownHeader}</p>
            </SubInstruction>
          </>
        }
      >
        <ListVolumeItems setDevice={setSelectedDevice} />
      </Devices>
    </>
  );
}
