import {
  getLastMicrophoneId,
  getLastSpeakerId,
  defaultMicrophone,
  defaultSpeaker,
  getMicrophone,
  getSpeaker,
} from '../utils/AudioDeviceUtils';

export function getDeviceInputStatus(availableDevices) {
  const anyMicSaved = defaultMicrophone(availableDevices) != null;

  let result = 'todo';
  if (anyMicSaved) result = 'pass';
  else {
    if (
      availableDevices !== undefined &&
      Object.keys(availableDevices.input).length === 0
    )
      result = 'fail';
  }
  return result;
}

export function getDeviceOutputStatus(availableDevices) {
  const anySpeakerSaved = defaultSpeaker(availableDevices) != null;

  let result = 'todo';
  if (anySpeakerSaved) result = 'pass';
  else {
    if (
      availableDevices !== undefined &&
      Object.keys(availableDevices.output).length === 0
    )
      result = 'fail';
  }
  return result;
}

export function getMicSetupName(availableDevices) {
  let setupName;
  if (
    defaultMicrophone(availableDevices) != null &&
    getLastMicrophoneId(defaultMicrophone(availableDevices) != null)
  ) {
    setupName = getMicrophone(
      getLastMicrophoneId(defaultMicrophone(availableDevices).deviceId)
    ).name;
  }
  return setupName;
}

export function getSpeakerSetupName(availableDevices) {
  let setupName;
  if (
    defaultSpeaker(availableDevices) != null &&
    getLastSpeakerId(defaultMicrophone(availableDevices) != null)
  ) {
    setupName = getSpeaker(
      getLastSpeakerId(defaultSpeaker(availableDevices).deviceId)
    ).name;
  }
  return setupName;
}
