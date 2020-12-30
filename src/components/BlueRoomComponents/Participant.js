import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import {
  colors,
  btnBackgroundSelect,
  backgroundColor,
  btnTextColor,
  btnBackgroundColor,
} from '../../contexts/styling/LolaTheme';
import { set_stream_playback_params } from '../../ipc/AudioClient';
import dial from '../../assets/images/BlueRoomImages/dial.png';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCurrentDimensions } from '../../utils/sizingUtils';
import { ceil } from 'lodash';
import { useSelector } from 'react-redux';

let halfPanelWidth = 90;
let yOffset = 100; //currently where on the screen I am choosing to line up the Participant Panels

const ParticipantController = styled(motion.div)`
  position: absolute;
  left: ${({ offset }) => offset}px;
  bottom: ${yOffset}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${backgroundColor};
  width: 180px;
  height: 60px;
  box-shadow: ${({ sideShadow }) => sideShadow}px
    ${({ baseShadow }) => baseShadow}px 6px #00000040; //change 0 left, r based on center //change 3 smaller as you go up the screen
  border: 0.5px solid ${colors.lolaBlack};
  border-radius: 9px;
`;

const Instrument = styled.div`
  background: url('${(props) => props.bgImg}') no-repeat center center;
  background-size: contain;
  width: 25%;
  height: 76%;
`;

const MuteBox = styled.div`
  width: 35%;
  padding: 2px;
  height: 80%;
  display: flex;
  place-items: center;
  font-size: 15px;
  border-radius: 9px;
  line-height: 0.9em;
  cursor: pointer;
  color: ${btnTextColor};
  background-color: ${btnBackgroundColor};
  &:hover {
    background-color: ${btnBackgroundSelect};
  }
`;

function MuteButton({ name }) {
  return <MuteBox>mute {name}</MuteBox>;
}

const VolumeDial = styled.div`
  background: url(${dial}) no-repeat center;
  background-size: contain;
  width: 25%;
  height: 100%;
`;

let ptInfo = null;

export default function Participant({
  participant,
  vol,
  instrument,
  constraintsRef,
  index,
}) {
  const audioProcIds = useSelector((state) => state.audioProcIds);

  let name = participant.displayName;
  let isWifi = participant.isWifi;
  let audioMetaData =
    participant.audioStream != null
      ? participant.streamsMeta[participant.audioStream]
      : null;
  let audioProcId = audioProcIds[participant.id];

  //once we know how large header is, we can grab this value
  //not sure whehter it will be fixed or variable yet
  //so just putting on the current header size of 165px
  let screen = useCurrentDimensions(); //calls a listener that returns the screen height and width
  const centerX = screen.width / 2;
  const xIndent = landingPosition(index); //for calculating the initial placement of the participant panel
  let panX = xIndent + halfPanelWidth - centerX; //inital panX value prior to any recalculations
  let baseY = screen.height - 100;

  useEffect(() => {
    if ((centerX || baseY) && ptInfo) recalculatePanX(ptInfo);
  }, [screen]);

  //
  const y = useMotionValue(0); //can I use these inputs to creat a starting spot?
  const x = useMotionValue(0);

  //these values need to be tied to the width and height of the big blue room - currently hardcoded for testing
  const scale = useTransform(y, [-800, 200], [0.5, 1.5]); //changing the scale when dragged along the y axis
  const Yshadow = useTransform(y, [-800, 200], [3, 10]); //from a 3px shadow to a 10px shadow along x axis
  const Xshadow = useTransform(x, [0, 900], [-10, 10]);
  //need to explore useMotionTamplate

  let baseShadow = ceil(Yshadow.current);
  let sideShadow = ceil(Xshadow.current);

  function landingPosition(index) {
    let xOffset = index * halfPanelWidth + 60; // alittle extra padding so the first controller is not flush against screen left
    return xOffset;
  }

  //NOTES for WESLEY
  //screen.height will update on resize, but baseY does not reaclaculate
  //when the participant panel is repositioned due to flex behavior (updates when dragged).
  //Paul suggested not diving much deeper into this, since the blue room may be
  //completely redone. You will have current screen.height info on resize, tho
  function onPan(event, info) {
    let panXFraction = panX / screen.width + 0.5;
    let volumeYFraction = info.point.y / screen.height;
    //let volumeYFraction = baseY / screen.height; //up to you which you want to grab

    // wesley, this is where the new code needs to go...

    console.log(
      `participant audio metadata: ${JSON.stringify(audioMetaData, null, 2)}`
    );

    let new_weights = [1, 1]; // this needs to be coordinated with MonitorSessionStatus
    // and needs to be the logic for actual panning
    let params = {
      type: 'update_route_weights',
      route_weights: new_weights,
    };
    set_stream_playback_params(audioProcId, params);
    ptInfo = info.point;
    recalculatePanX(info.point);
  }

  function recalculatePanX(userPos) {
    baseY = userPos.y - 165; //just subtracting the header size for now
    panX = userPos.x - centerX; //subtracted from center
  }

  return (
    <ParticipantController
      offset={xIndent}
      onPan={onPan}
      drag={true}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragTransition={{}}
      y={y}
      x={x}
      scale={scale}
      baseShadow={baseShadow}
      sideShadow={sideShadow}
    >
      <MuteButton name={name + (isWifi ? ' - Wi-Fi' : '')} />
      <VolumeDial vol={vol} />
      <Instrument bgImg={instrument} />
    </ParticipantController>
  );
}
