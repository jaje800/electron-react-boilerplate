import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {
  backgroundColor,
  colors,
  fontSizes,
} from '../../contexts/styling/LolaTheme';
import { LolaButton } from '../../components/GreenRoomComponents/LolaButton';
import Avatar from '../../components/BlueRoomComponents/Avatar';
import { connect, useDispatch } from 'react-redux';
import { leaveSessionRequested } from '../../actions/AudioSessionActions';

const SessionButton = styled(LolaButton)`
  min-width: 120px;
  font-size: 15px;
  margin: 0;
  padding: 0.5px 0.5em 0.5px 0.5em;
  height: 20px;
`;

const PanelSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 0.5em;
  margin-right: 0.5em;
`;

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  .value {
    width: 0.75em; //leaves space for the double digits in 10
    padding-left: 2px;
    //flex: 1;  // not sure why this helps
    font-size: ${fontSizes.itsy};
  }
  .slider {
    cursor: pointer;
    flex: 6;
    width: 100px;
    height: 8px;
    //border: 4px solid firebrick;
    background: ${colors.lolaYellow};
    outline: none;
  }
`;

function Slider(props) {
  const [value, setValue] = useState(5);
  const handleOnChange = (e) => setValue(e.target.value);
  return (
    <Styles color={colors.Night}>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        className="slider"
        onChange={handleOnChange}
      />
      <div className="value">{value}</div>
    </Styles>
  );
}

const ControlBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  bottom: -2px;
  right: 0px;
  align-items: flex-end;
  justify-content: space-around;
`;

const CenterSpot = styled.div`
  position: absolute;
  bottom: -2px;
  left: 50%;
  border: 0px solid firebrick;
  align-items: center;
  justify-content: center;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 10px 10px 0;
  background-color: ${backgroundColor};
  border-radius: 10px;
  justify-content: space-between;
  align-content: center;
  height: 60px;
`;

const Labels = styled.div`
  cursor: default;
  font-size: 15px;
  background-color: ${colors.lolaGray};
  border-radius: 6px;
  align-content: center;
  color: ${colors.lolaBlack};
  min-width: 120px;
`;

function TheAvatarPanelBase({ participants }) {
  const dispatch = useDispatch();

  function exitSession() {
    dispatch(leaveSessionRequested());
  }

  function endSession() {
    dispatch(leaveSessionRequested(true));
  }
  /*
        {participants &&
          Object.keys(participants).map((pKey) => {
            return <Avatar name={participants[pKey].displayName} key={pKey} />;
          })}
*/
  return (
    <>
      <CenterSpot>
        <Avatar />
      </CenterSpot>
      <ControlBox>
        <ControlPanel>
          <PanelSection>
            <Labels>my headphones</Labels>
            <Labels>my volume out</Labels>
          </PanelSection>
          <PanelSection>
            <Slider />
            <Slider />
          </PanelSection>
          <PanelSection>
            <SessionButton
              id="exitSessionBtn"
              txt="leave this Session"
              onClick={() => exitSession()}
            />
            <SessionButton
              id="endSessionBtn"
              txt="end this Session"
              onClick={() => endSession()}
            />
          </PanelSection>
        </ControlPanel>
      </ControlBox>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    participants: state.participants,
  };
};

const TheAvatarPanel = connect(mapStateToProps, {})(TheAvatarPanelBase);
export default TheAvatarPanel;
