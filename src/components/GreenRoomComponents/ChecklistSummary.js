import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { PageTitle } from './PageTitle';
import { PageBorder, SINGLE_BTN_PADB, MIN_ITEM_DIST } from './PageBorder';
import { LolaButton } from './LolaButton';
import { ChecklistTxt } from '../../assets/LolaText';
import {
  getNetworkRank,
  getNetworkStatus,
  useOnlineStatus,
} from '../../utils/netInfoUtils';
import { networkConditionsSelector } from '../../controllers/NetworkConditionsController';
import {
  colors,
  fontSizes,
  devOutline,
} from '../../contexts/styling/LolaTheme';
import { useHistory } from 'react-router-dom';
import { BLUE_ROOM_PATH } from '../../routes';
import SvgCheckbox from '../../assets/images/SvgModified/SvgCheckbox';
import {
  getDeviceInputStatus,
  getDeviceOutputStatus,
  getMicSetupName,
  getSpeakerSetupName,
} from '../../utils/checklistUtils';

const NetworkBlock = styled.div`
  text-align: left;
  border: ${devOutline} solid palegoldenrod;
  display: flex;
  flex-direction: row;
  justify-content: left;
  line-height: 1em;
  height: 20vh;
`;

const AudioBlock = styled(NetworkBlock)`
  border: ${devOutline} solid hotpink;
  height: auto;
  padding: 0 0 ${MIN_ITEM_DIST};
`;

const DeviceRow = styled(AudioBlock)`
  font-size: ${fontSizes.txt};
  text-align: left;
  border: ${devOutline} solid gold;
  padding: 0 2em ${MIN_ITEM_DIST};
`;

const SubInstructions = styled.p`
  padding: 0 2.75em ${MIN_ITEM_DIST};
  text-align: center;
`;

//L8R float the checkbox left
const SummaryText = styled.div`
  margin-left: 1em;
`;
const ItemName = styled.div`
  position: absolute;
  margin-left: 10em;
`;

const StatusAreaContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: ${devOutline} solid ${colors.lolaBlue};
  font-size: ${fontSizes.hr2};
`;
const BoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  margin-bottom: 3px;
`;

function SummaryRow({ children, desc, result, flagged }) {
  return (
    <BoxHeader>
      <SvgCheckbox result={result} flagged={flagged} w="5vw" h="5vh" />
      <SummaryText>{desc}</SummaryText>
      <ItemName>{children}</ItemName>
    </BoxHeader>
  );
}

export default function ChecklistSummary() {
  const history = useHistory();
  const availableDevices = useSelector((state) => state.availableAudioDevices);
  const networkConditions = useSelector(networkConditionsSelector);

  function NetworkMessage() {
    let rank = getNetworkRank(networkConditions, isOffline);
    switch (rank) {
      case -1:
        return 'ummm no network dude';
      case 1:
        return 'you acknowledge that you are on wifi, and understand that your experience will be less than optimal';
      case 2:
        return 'you acknowledge your ethernet connection is unstable or spotty, and understand your experience will be less than optimal';
      case 3:
        return 'whoa, like your internet is amazing!';
      default:
        return null;
    }
  }

  function MicSetupName() {
    let setupName = getMicSetupName(availableDevices);
    return <p>{setupName}</p>;
  }

  function SpeakerSetupName() {
    let setupName = getSpeakerSetupName(availableDevices);
    return <p>{setupName}</p>;
  }

  let isOffline = useOnlineStatus(); //need this to update the status checkbox
  return (
    <>
      <PageBorder padb={SINGLE_BTN_PADB} w="60vw">
        <PageTitle>{ChecklistTxt.passTitle}</PageTitle>
        <StatusAreaContainer>
          <NetworkBlock>
            <SummaryRow
              desc={NetworkMessage(getNetworkRank())}
              result={
                getNetworkStatus(getNetworkRank(networkConditions, isOffline))
                  .result
              }
              flagged={
                getNetworkStatus(getNetworkRank(networkConditions)).flagged
              }
            ></SummaryRow>
          </NetworkBlock>
          <AudioBlock>
            <SummaryRow
              desc="your audio setup has been selected"
              result="pass"
            ></SummaryRow>
          </AudioBlock>
          <DeviceRow>
            <SummaryRow
              desc="microphone(s): "
              result={getDeviceInputStatus(availableDevices)}
            >
              <MicSetupName />
            </SummaryRow>
          </DeviceRow>
          <DeviceRow>
            <SummaryRow
              desc="headphones:"
              result={getDeviceOutputStatus(availableDevices)}
            >
              <SpeakerSetupName />
            </SummaryRow>
          </DeviceRow>
          <SubInstructions>{ChecklistTxt.explanation}</SubInstructions>
        </StatusAreaContainer>
        <LolaButton
          btnstyle="main"
          id="BBRbtn"
          txt={ChecklistTxt.BBRbtn}
          onClick={() => {
            history.push(BLUE_ROOM_PATH);
          }}
        />
      </PageBorder>
    </>
  );
}
