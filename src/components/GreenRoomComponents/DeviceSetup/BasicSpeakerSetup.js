import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { LolaButton } from '../../GreenRoomComponents/LolaButton';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';
import { defaultMicrophone } from '../../../utils/AudioDeviceUtils';
import SaveSpeakerSetup from './SaveSpeakerSetup';
import SvgVolumeMeter from '../../../assets/images/SvgModified/SvgVolumeMeter';
import {
  fontSizes,
  devOutline,
  colors,
  borderRadius,
  backgroundColor,
  textColor,
} from '../../../contexts/styling/LolaTheme';
import { HeadphTxt } from '../../../assets/LolaText';
import Devices from './Devices';
import { SubInstruction } from '../SubInstruction';
import { DBL_BTN_PADB } from '../PageBorder';
import { VolItemContainer } from './ListVolumeItems';
import { Spacer } from '../Spacer';

const VolText = styled.div`
  padding-right: 0.25em;
  font-size: ${fontSizes.txt};
  border: ${devOutline} dashed darkcyan;
  width: 11vw;
`;

const VolRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 5vh;
`;

// extension of the VolItemContainer
// rather than passing in props, overwriting
// the border and hover behavior
const VolContainer = styled(VolItemContainer)`
  padding: 0.1em 0.1em 0.1em
    ${({ spacefor }) => (spacefor === 'true' ? '2em' : '.2em')};
  border: 1px solid ${colors.lolaGray};
  border-radius: ${borderRadius}px;
  &:hover {
    background-color: ${backgroundColor};
    cursor: default;
    color: ${textColor};
  }
`;

export default function BasicSpeakerSetup() {
  const { setSelectedSpeaker, setNextSubComponent } = useContext(
    GreenRoomContext
  );
  let availableDevices = useSelector((state) => state.availableAudioDevices);
  let micDev = defaultMicrophone(availableDevices);
  const [outputIndex, setOutputIndex] = useState(getOutputIndex());
  if (micDev == null) {
    return null;
  }

  function getOutputIndex() {
    let oid = '';
    if (micDev) {
      let idev = availableDevices.input[micDev.deviceId];
      if (idev.id in availableDevices.output) oid = idev.id;
      else if (idev.paired_output_id in availableDevices.output)
        oid = idev.paired_output_id;
      else oid = availableDevices.default_output_device;
    }
    if (oid === '') return 0; //can't find headphones
    var outputIndex = Object.keys(availableDevices.output).indexOf(oid);
    return outputIndex;
  }

  let deviceName;
  let speaker;
  if (Object.keys(availableDevices.output).length > 0) {
    let oid = Object.keys(availableDevices.output)[outputIndex];
    let dev = availableDevices.output[oid];
    deviceName = dev.name;
    speaker = {
      deviceId: oid,
      channels: dev.num_channels > 1 ? [0, 1] : [1],
    };
  } else {
    deviceName = 'null';
    speaker = {
      deviceId: 'null',
      channels: 'null',
    };
  }

  function useNextComp() {
    setOutputIndex(outputIndex + 1);
    if (outputIndex > Object.keys(availableDevices.output).length - 2) {
      setOutputIndex(0);
    }
    return outputIndex;
  }

  function SaveSpeakerComp(speaker) {
    return <SaveSpeakerSetup selectedSpeaker={speaker} />;
  }

  function HeadphoneCheck() {
    let singleOption = Object.keys(availableDevices.output).length === 1;
    return (
      <Devices
        w="55vw"
        padb={DBL_BTN_PADB}
        title={HeadphTxt.headph1Title}
        subtitle={HeadphTxt.headph1Subtitle}
        explanation={
          <SubInstruction lrpad=".75em">
            {HeadphTxt.headph1Explanation}
          </SubInstruction>
        }
      >
        <VolRow>
          <VolText w="14vw">{HeadphTxt.headphLabel}</VolText>
          <VolContainer spacefor="true">
            <div> {deviceName} </div>
            <SvgVolumeMeter w="15vw" />
          </VolContainer>
          <LolaButton
            disabled={singleOption}
            btnstyle="form"
            id="tryNextBtn"
            txt={HeadphTxt.tryNextBtn}
            onClick={useNextComp}
          />
        </VolRow>
        <Spacer h="1em" />
        <LolaButton
          btnstyle="main"
          id="useTheseHeadphBtn"
          txt={HeadphTxt.useTheseHeadphBtn}
          onClick={() => {
            setSelectedSpeaker(true);
            setNextSubComponent(SaveSpeakerComp(speaker));
          }}
        />
        <LolaButton
          btnstyle="main"
          id="noWorkingHeadphBtn"
          txt={HeadphTxt.noWorkingHeadphBtn}
          onClick={() => {}}
        />
      </Devices>
    );
  }

  function NoHeadphonesDetected() {
    return (
      <Devices
        w="58vw"
        title={HeadphTxt.noHeadphTitle}
        subtitle={HeadphTxt.noHeadphSubtitle}
        padb={DBL_BTN_PADB}
        explanation={
          <SubInstruction lrpad="3.75em">
            {HeadphTxt.noHeadphExplanation}
          </SubInstruction>
        }
      >
        <Spacer h="7vh" />
        <LolaButton
          btnstyle="main"
          id="HPwebsiteHelpBtn"
          txt={HeadphTxt.HPwebsiteHelpBtn}
          onClick={() => {}} //go to the website
        />
        <LolaButton
          btnstyle="main"
          id="HPpathToBBRbtn"
          txt={HeadphTxt.HPpathToBBRbtn}
          onClick={() => {}} //demo mode in the BBR
        />
      </Devices>
    );
  }
  return deviceName === 'null' ? <NoHeadphonesDetected /> : <HeadphoneCheck />;
}
