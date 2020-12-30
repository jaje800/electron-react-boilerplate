import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LolaButton } from '../LolaButton';
import {
  channelIndexToConfig,
  createMicrophone,
  setLastMicrophoneId,
  getFullDisplayName,
} from '../../../utils/AudioDeviceUtils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { StyledInlineErrorMessage } from '../../FormsComponents/FormsStyledComponents';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';
import { MicTxt } from '../../../assets/LolaText';
import Devices from './Devices';
import { SubInstruction } from '../SubInstruction';
import { DeviceFormInput } from '../../FormsComponents/DeviceFormInput';
import { DeviceFormSaveSetup } from '../../FormsComponents/DeviceFormSaveSetup';

const validationSchema = Yup.object().shape({
  devname: Yup.string().required('please name your setup'),
});

const UpdateMicName = (name) => {
  const dispatch = useDispatch();
  dispatch({
    type: 'GENERIC_UPDATE_REQUESTED',
    payload: {
      micsetup: name,
    },
  });
  return null;
};

const SaveDeviceForm = ({ selectedDeviceId }) => {
  let availableDevices = useSelector((state) => state.availableAudioDevices);
  const { setNextSubComponent } = useContext(GreenRoomContext);
  const audioLevels = useSelector((state) => state.localAudioLevels);

  let userDeviceChannels =
    audioLevels.devices[selectedDeviceId].loudest_channels;

  const handleSubmit = (values, actions) => {
    return new Promise((resolve, reject) => {
      let config = channelIndexToConfig(
        selectedDeviceId,
        availableDevices.input,
        userDeviceChannels
      );
      let id = createMicrophone(config, values.devname);
      setLastMicrophoneId(id);
      setNextSubComponent(null);
      resolve();
    });
  };

  let deviceName = getFullDisplayName(
    selectedDeviceId,
    availableDevices.input,
    userDeviceChannels
  );
  return (
    <Formik
      initialValues={{
        devname: deviceName,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, isValid }) => {
        return (
          <Form name="saveSetUp">
            {/* <UpdateSetupName name={values.devname} /> */}
            {UpdateMicName(values.devname)}
            <DeviceFormSaveSetup>
              <DeviceFormInput
                autoFocus={true}
                type="text"
                name="devname"
                valid={touched.code && !errors.code}
                error={touched.code && errors.code}
              />
              <LolaButton
                tabindex="1"
                btnstyle="form"
                type="submit"
                id="MsaveBtn"
                txt={MicTxt.MsaveBtn}
              />
            </DeviceFormSaveSetup>
            {Object.keys(errors).map((errorKey) => (
              <StyledInlineErrorMessage key={errorKey}>
                {errors[errorKey]}
              </StyledInlineErrorMessage>
            ))}
          </Form>
        );
      }}
    </Formik>
  );
};

export default function SaveMicSetup({ selectedMicrophoneId }) {
  let availableDevices = useSelector((state) => state.availableAudioDevices);
  const { setSelectedMicrophone, setNextSubComponent } = useContext(
    GreenRoomContext
  );
  const stillAvailable = selectedMicrophoneId in availableDevices.input;

  if (!stillAvailable) {
    console.log('why you unplug me bro? mic');
    setSelectedMicrophone(false);
    setNextSubComponent(null);
    return null;
  }

  return (
    <Devices
      w="58vw"
      title={MicTxt.mic2Title}
      subtitle={MicTxt.mic2Subtitle}
      padb="0px"
      explanation={
        <SubInstruction lrpad="8em">{MicTxt.mic2Explanation}</SubInstruction>
      }
    >
      <SaveDeviceForm selectedDeviceId={selectedMicrophoneId} />
    </Devices>
  );
}
