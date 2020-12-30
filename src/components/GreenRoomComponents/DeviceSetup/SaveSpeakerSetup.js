import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LolaButton } from '../../GreenRoomComponents/LolaButton';
import {
  channelIndexToConfig,
  createSpeaker,
  setLastSpeakerId,
  getFullDisplayName,
} from '../../../utils/AudioDeviceUtils';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { StyledInlineErrorMessage } from '../../../components/FormsComponents/FormsStyledComponents';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';
import { HeadphTxt } from '../../../assets/LolaText';
import Devices from './Devices';
import { SubInstruction } from '../SubInstruction';
import { DeviceFormInput } from '../../FormsComponents/DeviceFormInput';
import { DeviceFormSaveSetup } from '../../FormsComponents/DeviceFormSaveSetup';

const validationSchema = Yup.object().shape({
  devname: Yup.string().required('please name your setup'),
});
const UpdateSpeakerName = (name) => {
  const dispatch = useDispatch();
  dispatch({
    type: 'GENERIC_UPDATE_REQUESTED',
    payload: {
      speakersetup: name,
    },
  });
  return null;
};

const SaveSpeakerForm = ({ selectedDevice }) => {
  let availableDevices = useSelector((state) => state.availableAudioDevices);
  const { setNextSubComponent } = useContext(GreenRoomContext);

  const handleSubmit = (values, actions) => {
    return new Promise((resolve, reject) => {
      let config = channelIndexToConfig(
        selectedDevice.deviceId,
        availableDevices.output,
        selectedDevice.channels
      );
      let id = createSpeaker(config, values.devname);
      setLastSpeakerId(id);
      setNextSubComponent(null);
      resolve();
    });
  };

  if (
    selectedDevice == null ||
    availableDevices == null ||
    !(selectedDevice.deviceId in availableDevices.output)
  )
    return null;

  let deviceName = getFullDisplayName(
    selectedDevice.deviceId,
    availableDevices.output,
    selectedDevice.channels
  );

  return (
    <Formik
      initialValues={{
        devname: deviceName,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleSubmit, isSubmitting, isValid }) => {
        return (
          <Form name="saveSetUp">
            {UpdateSpeakerName(values.devname)}
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
                id="HPsaveBtn"
                txt={HeadphTxt.HPsaveBtn}
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

export default function SaveSpeakerSetup({ selectedSpeaker }) {
  let availableDevices = useSelector((state) => state.availableAudioDevices);
  const {
    setSelectedMicrophone,
    setSelectedSpeaker,
    setNextSubComponent,
  } = useContext(GreenRoomContext);
  const stillAvailable = selectedSpeaker.deviceId in availableDevices.output;

  if (!stillAvailable) {
    console.log('speaker why you unplug me bro?');
    setSelectedMicrophone(false);
    setSelectedSpeaker(false);
    setNextSubComponent(null);
    UpdateSpeakerName(null);
    return null;
  }

  return (
    <Devices
      w="58vw"
      title={HeadphTxt.headph2Title}
      subtitle={HeadphTxt.headph2Subtitle}
      padb="0px"
      explanation={
        <SubInstruction lrpad="8em">
          {HeadphTxt.headph2Explanation}
        </SubInstruction>
      }
    >
      <SaveSpeakerForm selectedDevice={selectedSpeaker} />
    </Devices>
  );
}
