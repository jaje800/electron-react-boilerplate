const INITAL_STATE = {
  status: 'stopped',
  loudestDeviceInfo: {
    deviceId: '',
    channels: '',
  },
};

export default function (prevState = INITAL_STATE, action) {
  if (action == null || action.type == null) return prevState;
  switch (action.type) {
    case 'AUDIO_SESSION_UPDATE':
      return { ...prevState, ...action.payload };

    case 'AUDIO_SESSION_SET':
      return { ...action.payload };

    default:
      return prevState;
  }
}

export const getStatus = (state) => {
  return state.status;
};

export const getInfoForStatusCall = (state) => {
  return {
    sessionId: state.sessionId,
    version: state.version,
    authorization: state.participantsAuth,
  };
};

export const getInfoForParticipantsStatus = (state) => {
  if (state.status === 'running') {
    return {
      participants: state.participants || {},
      participantId: state.participantId,
      audioOut: state.audioOut,
      sampleRate: state.sampleRate || 48000,
      audioProcIds: state.audioProcIds || {},
    };
  }
  return {
    participants: {},
    audioProcIds: {},
  };
};

export const getInfoForLeave = (state) => {
  return {
    status: state.status,
    sessionId: state.sessionId,
    participantId: state.participantId,
    personalAuth: state.personalAuth,
    ownerAuth: state.ownerAuth,
  };
};

export const getInfoForLoudest = (state) => {
  return state.loudestDeviceInfo;
};

export const getRoomModel = (state) => {
  return state.roomModel;
};
