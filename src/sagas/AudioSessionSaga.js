import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  createSession,
  startSession,
  joinSession,
  createStream,
  querySession,
  leaveSession,
  stopSession,
  deleteSession,
} from '../apis/SynchronicityApis';

import {
  create_audio_encoder,
  create_direct_monitor,
  create_local_participant,
  acquire_engine,
  release_engine,
  get_audio_meter_levels,
} from '../ipc/AudioClient';

import { getBaseUrl } from '../apis/ApiService';
import {
  getStatus,
  getInfoForLeave,
  getInfoForLoudest,
} from '../reducers/AudioSessionReducer';
import { monitorSessionStatus } from './MonitorSessionStatus';

function createRoutes(audioIn, numStereoPairs, audioOut) {
  var ar = [];
  let ic = audioIn.channels;
  let oc = audioOut.channels;
  if (oc.length >= 2) {
    for (var i = 0; i < numStereoPairs; i++) {
      ar.push({
        src: ic[i * 2],
        dst: oc[0],
        weight: 1,
      });
      ar.push({
        src: ic[i * 2 + 1],
        dst: oc[1],
        weight: 1,
      });
    }
    for (i = numStereoPairs * 2; i < ic.length; i++) {
      ar.push({
        src: ic[i],
        dst: oc[0],
        weight: 1,
      });
      ar.push({
        src: ic[i],
        dst: oc[1],
        weight: 1,
      });
    }
  } else if (oc.length === 1) {
    ic.forEach((inChannel) => {
      ar.push({
        src: inChannel,
        dst: oc[0],
        weight: 1,
      });
    });
  }
  return ar;
}

function* join(
  sessionId,
  participantsAuth,
  joinWithAudio,
  audioIn,
  numStereoPairs,
  framesPerPacket,
  sampleRate,
  monitorLocalAudio,
  audioOut
) {
  yield put({
    type: 'AUDIO_SESSION_UPDATE',
    payload: { status: 'joining_session' },
  });
  let joinSessionReply = yield joinSession(sessionId, participantsAuth);
  let {
    participant_id,
    personal_authentication,
    one_time_authentication,
  } = joinSessionReply;

  create_local_participant({
    synchronicityUrl: getBaseUrl(),
    sessionId,
    participantId: participant_id,
    participantAuth: personal_authentication,
    oneTimeAuth: one_time_authentication,
  });

  let audioStreamId, audioEncoderId, localMonitoringId;
  if (joinWithAudio) {
    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: { status: 'creating_audio_stream' },
    });
    let createStreamReply = yield createStream(
      participant_id,
      'audio',
      audioIn.channels.length,
      numStereoPairs,
      framesPerPacket,
      personal_authentication
    );
    audioStreamId = createStreamReply.stream_id;

    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: { status: 'creating_audio_encoder' },
    });
    audioEncoderId = yield create_audio_encoder({
      deviceId: audioIn.deviceId,
      channels: audioIn.channels,
      numStereoPairs,
      participantId: participant_id,
      streamId: audioStreamId,
    });

    if (monitorLocalAudio) {
      yield put({
        type: 'SET_SESSION_STATUS',
        payload: { status: 'creating_audio_input_monitor' },
      });
      localMonitoringId = yield create_direct_monitor({
        srcDeviceId: audioIn.deviceId,
        dstDeviceId: audioOut.deviceId,
        routes: createRoutes(audioIn, numStereoPairs, audioOut),
      });
    }
  }

  yield put({
    type: 'AUDIO_SESSION_UPDATE',
    payload: {
      status: 'running',
      sessionId,
      participantsAuth,
      participantId: participant_id,
      personalAuth: personal_authentication,
      audioStreamId,
      audioEncoderId,
      localMonitoringId,
      audioIn,
      numStereoPairs,
      framesPerPacket,
      sampleRate,
      audioOut,
      version: 0,
    },
  });

  yield call(monitorSessionStatus);
}

// worker Saga: will be fired on START_SESSION_REQUESTED actions
function* startSessionSaga(action) {
  let deleteOnErrorId;

  try {
    let initStatus = yield select(getStatus);
    if (initStatus !== 'stopped') {
      console.log("can't start a meeting that is not stopped");
      return;
    }

    acquire_engine();

    let { payload } = action;
    let {
      sessionId,
      sampleRate,
      joinWithAudio,
      audioIn,
      numStereoPairs,
      framesPerPacket,
      audioOut,
      monitorLocalAudio,
    } = payload;

    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: { status: 'starting' },
    });

    if (sessionId == null) {
      let reply = yield createSession('', true /*trasient*/);
      sessionId = reply.session_id;
      deleteOnErrorId = sessionId;
      yield put({
        type: 'AUDIO_SESSION_UPDATE',
        payload: { sessionCode: reply.session_code },
      });
    }

    let startSessionReply = yield startSession(sessionId, sampleRate);
    let { owner_authorization, participants_authorization } = startSessionReply;

    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: { ownerAuth: owner_authorization },
    });

    yield join(
      sessionId,
      participants_authorization,
      joinWithAudio,
      audioIn,
      numStereoPairs,
      framesPerPacket,
      sampleRate,
      monitorLocalAudio,
      audioOut
    );
  } catch (e) {
    if (deleteOnErrorId != null) {
      try {
        deleteSession(deleteOnErrorId);
      } catch (e) {
        console.log(
          'exception thrown trying to recover from previous exception'
        );
      }
    }
    release_engine();
    yield put({ type: 'AUDIO_SESSION_UPATE', payload: { status: 'stopped' } });
  }
}

/////////////////////////////////////////////

// worker Saga: will be fired on JOIN_SESSION_REQUESTED actions
function* joinSessionSaga(action) {
  try {
    let initStatus = yield select(getStatus);
    if (initStatus !== 'stopped') {
      console.log("can't join a meeting that is not stopped");
      return;
    }

    acquire_engine();

    let { payload } = action;
    let {
      sessionCode,
      joinWithAudio,
      audioIn,
      numStereoPairs,
      framesPerPacket,
      audioOut,
      monitorLocalAudio,
    } = payload;

    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: {
        status: 'starting',
        sessionCode,
      },
    });

    let querySessionReply = yield querySession(sessionCode);
    let sessionId = querySessionReply.session_id;
    let partipantsAuth = querySessionReply.participants_authorization;
    let sampleRate = querySessionReply.audio_sample_rate;

    yield join(
      sessionId,
      partipantsAuth,
      joinWithAudio,
      audioIn,
      numStereoPairs,
      framesPerPacket,
      sampleRate,
      monitorLocalAudio,
      audioOut
    );
  } catch (e) {
    release_engine();
    yield put({ type: 'AUDIO_SESSION_UPDATE', payload: { status: 'stopped' } });
  }
}

///////////////////////////////////////////

// worker Saga: will be fired on LEAVE_SESSION_REQUESTED actions
function* leaveSessionSaga(action) {
  try {
    // we allow the user to leave/stop even if they are part way
    // through joining/starting. So clicking start/join and
    // then immediately leaving will go ahead and do whatever
    // leave operations should be done.  Leave/Stop override
    // Start/Join.
    // That said...
    // That was the original design and some of MonitorSessionStatus
    // is written to implement this behavior, however at the
    // moment AudioSessionSagas will only run one saga at a time,
    // so once a start or join gets going we AudioSessionSagas
    // won't process a request to stop/leave until the start/join
    // completes.  That's ok for now...
    let {
      status,
      sessionId,
      participantId,
      personalAuth,
      ownerAuth,
    } = yield select(getInfoForLeave);
    if (status !== 'stopped') {
      if (sessionId != null) {
        if (participantId != null && personalAuth != null) {
          leaveSession(sessionId, participantId, personalAuth);
        }
        if (action.payload.andStop && ownerAuth != null) {
          stopSession(sessionId, ownerAuth);
        }
      }
      release_engine();
      yield put({
        type: 'AUDIO_SESSION_UPDATE',
        payload: {
          roomModel: {},
          status: 'stopped',
        },
      });
    } else console.log('session already stopped, nothing to do');
  } catch (e) {}
}

////////////////////////////////////////

function* monitorLevelsSaga(action) {
  let levels = yield get_audio_meter_levels(action.payload.monitorId);
  let loudestDeviceInfo = yield select(getInfoForLoudest);
  yield put({
    type: 'AUDIO_SESSION_UPDATE',
    payload: {
      localAudioLevels: levels,
    },
  });
  if (
    loudestDeviceInfo.deviceId !== levels.loudest_device &&
    levels.loudest_device !== ''
  ) {
    yield put({
      type: 'AUDIO_SESSION_UPDATE',
      payload: {
        loudestDeviceInfo: {
          deviceId: levels.loudest_device,
          channels: levels.devices[levels.loudest_device].loudest_channels,
        },
      },
    });
  }
  //TODO: get loudest_channels for selectedDeviceID
}

function* genericUpdateState(action) {
  yield put({
    type: 'AUDIO_SESSION_UPDATE',
    payload: action.payload,
  });
}

export function* AudioSessionSagas() {
  yield takeLatest('JOIN_SESSION_REQUESTED', joinSessionSaga);
  yield takeLatest('START_SESSION_REQUESTED', startSessionSaga);
  yield takeLatest('LEAVE_SESSION_REQUESTED', leaveSessionSaga);
  yield takeLatest('MONITOR_LEVELS_REQUESTED', monitorLevelsSaga);
  yield takeLatest('GENERIC_UPDATE_REQUESTED', genericUpdateState);
}
