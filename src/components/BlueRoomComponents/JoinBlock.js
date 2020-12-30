import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { colors, formFieldColor } from '../../contexts/styling/LolaTheme';
import { LolaButton } from '../../components/GreenRoomComponents/LolaButton';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  InputField,
  StyledInlineErrorMessage,
  formRadius,
} from '../../components/FormsComponents/FormsStyledComponents';
import { BaseAligned } from '../../components/BlueRoomComponents/BaseAligned';
import { joinSessionRequested } from '../../actions/AudioSessionActions';
import {
  defaultMicrophone,
  defaultSpeaker,
} from '../../utils/AudioDeviceUtils';

/*******************   STILL LEARNING CODE STILL HAS TO COOK  ********************/
/*---------------------------------------------------------------------------------
The mini live code form input field, found in the join block
---------------------------------------------------------------------------------*/
const JoinInput = styled(InputField)`
  text-transform: uppercase;
  border: 1px solid ${colors.lolaGray};
  border-radius: ${formRadius};
  font-size: 12px;
  background-color: ${formFieldColor};
  text-align: center;
  width: 100px;
  height: 25px;
`;

const JoinForm = styled(Form)`
  border: 0px solid violet;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;

const JoinButton = styled(LolaButton)`
  min-width: 100px;
  font-size: 15px;
  padding: 0.5px 0.5em 0.5px 0.5em;
  margin: 0;
  height: 20px;
`;

const JoinError = styled(StyledInlineErrorMessage)`
  padding: 0;
  position: absolute;
  top: 0;
  margin-left: 3em;
  font-size: 15px;
`;

/*---------------------------------------------------------------------------------
the validation schema for the live code will be improved and expanded on later
---------------------------------------------------------------------------------*/
const validationSchema = Yup.object().shape({
  code: Yup.string().required('required'),
});

/*---------------------------------------------------------------------------------
The JoinBlock contains a the join session button
---------------------------------------------------------------------------------*/
function JoinBlock(props) {
  const availableDevices = useSelector((state) => state.availableAudioDevices);
  let selectedInput = defaultMicrophone(availableDevices);
  let selectedOutput = defaultSpeaker(availableDevices);

  const dispatch = useDispatch();
  const joinSession = useCallback(
    (sessionCode) => {
      if (!selectedInput) {
        throw new Error('no input device');
      }
      if (!selectedOutput) {
        throw new Error('no output device');
      }
      const action = joinSessionRequested(
        sessionCode,
        true,
        selectedInput,
        selectedInput.channels.length > 1 ? 1 : 0,
        120,
        true,
        selectedOutput
      );
      console.log(action);
      dispatch(action);
    },
    [dispatch, selectedInput, selectedOutput]
  );

  const handleSubmit = (values, actions) => {
    try {
      let uppercaseCode = values.code.toUpperCase();
      joinSession(uppercaseCode);
    } catch (error) {
      console.error(error.message);
      actions.setFieldError('submission', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        code: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid }) => {
        return (
          <JoinForm>
            <BaseAligned bigTxt="join" lilTxt="a Session" />
            <JoinInput
              allcaps="true"
              type="text"
              name="code"
              placeholder="session code" //maybe make this a background image to retain case
              valid={touched.code && !errors.code}
              error={touched.code && errors.code}
            />
            {Object.keys(errors).map((errorKey) => (
              <JoinError key={errorKey}>{errors[errorKey]}</JoinError>
            ))}
            <JoinButton
              btnstyle="form"
              type="submit"
              id="liveJoinBtn"
              txt="join"
              w="100px"
              disabled={!isValid || isSubmitting}
            />
          </JoinForm>
        );
      }}
    </Formik>
  );
}

export default JoinBlock;
