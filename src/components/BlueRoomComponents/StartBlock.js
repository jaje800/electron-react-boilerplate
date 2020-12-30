import React, { useCallback, useState } from 'react';
import { StyledInlineErrorMessage } from '../../components/FormsComponents/FormsStyledComponents';
import { BaseAligned } from '../../components/BlueRoomComponents/BaseAligned';
import { useSelector, useDispatch } from 'react-redux';
import { LolaButton } from '../../components/GreenRoomComponents/LolaButton';
import { startSessionRequested } from '../../actions/AudioSessionActions';
import {
  defaultMicrophone,
  defaultSpeaker,
} from '../../utils/AudioDeviceUtils';
import styled from 'styled-components';

/*******************   STILL LEARNING CODE STILL HAS TO COOK  ********************/

const StartBox = styled.div`
  border: 0px solid saddlebrown;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StartButton = styled(LolaButton)`
  min-width: 100px;
  font-size: 15px;
  margin: 0;
  padding: 0.5px 0.5em 0.5px 0.5em;
  height: 20px;
`;
const StartError = styled(StyledInlineErrorMessage)`
  padding: 0;
  position: absolute;
  top: 0;
  font-size: 15px;
  text-align: center;
`;

function StartBlock(props) {
  const availableDevices = useSelector((state) => state.availableAudioDevices);

  const [submitError, setError] = useState(false);

  const dispatch = useDispatch();
  const dispatchStartSessionRequested = useCallback(() => {
    let selectedInput = defaultMicrophone(availableDevices);
    let selectedOutput = defaultSpeaker(availableDevices);

    if (!selectedInput) {
      setError('no input device');
      return;
    }
    if (!selectedOutput) {
      setError('no output device');
      return;
    }
    const action = startSessionRequested(
      null,
      selectedInput.sampleRate,
      true,
      selectedInput,
      selectedInput.channels.length > 1 ? 1 : 0,
      120,
      true,
      selectedOutput
    );
    dispatch(action);
  }, [dispatch, availableDevices, setError]);

  const audioSessionCode = useSelector((state) => state.sessionCode);
  const audioSessionStatus = useSelector((state) => state.status);
  //still flushing out design - will upgrade from inline styling soon
  return (
    <StartBox>
      <BaseAligned bigTxt="start" lilTxt="a Session" />
      <StartButton
        w="100px"
        id="startNewBtn"
        txt="start new"
        onClick={dispatchStartSessionRequested}
        disabled={audioSessionStatus !== 'stopped'}
      />
      {submitError && <StartError>{submitError}</StartError>}
      {audioSessionCode && (
        <>
          <div> Session Code: </div>
          <div style={{ userSelect: 'text' }}>{audioSessionCode}</div>
        </>
      )}
    </StartBox>
  );
}

export default StartBlock;
