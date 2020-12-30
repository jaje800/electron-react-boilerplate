import { ApiService } from './ApiService';
import { audio_client_type, is_wifi_or_worse } from '../ipc/AudioClient';

export async function createSession(sessionName, transient = false) {
  return ApiService.post('/create_session', {}, {
    withCredentials: true,
    params: {
      session_name: sessionName,
      transient
    }
  });
}

export async function startSession(sessionId, audioSampleRate) {
  return ApiService.post('/start_session', {}, {
    withCredentials: true,
    params: {
      session_id: sessionId,
      audio_sample_rate: audioSampleRate
    }
  });
}

export async function stopSession(sessionId, authorization) {
  return ApiService.post('/stop_session', {}, {
    params: {
      session_id: sessionId
    },
    headers: {
      authorization
    }
  });
}

export async function deleteSession(sessionId) {
  return ApiService.delete('/delete_session', {
    withCredentials: true,
    params: {
      session_id: sessionId
    }
  });
}

export async function querySession(sessionCode) {
  return ApiService.get('/query_session', {
    withCredentials: true,
    params: {
      session_code: sessionCode
    }
  });
}

export async function joinSession(sessionId, authorization) {
  let is_wifi = false;
  if (audio_client_type() !== 'none')
    is_wifi = await is_wifi_or_worse();
  let network_type = is_wifi ? 'wifi' : 'ethernet';
  return ApiService.post('/join_session', {}, {
    withCredentials: true,
    params: {
      session_id: sessionId,
      network_type
    },
    headers: {
      authorization
    }
  });
}

export async function leaveSession(sessionId, participantId, authorization) {
  return ApiService.delete('/leave_session', {
    params: {
      session_id: sessionId,
      participant_id: participantId
    },
    headers: {
      authorization
    }
  });
}

export async function sessionStatus(sessionId, version, authorization) {
  return ApiService.get('/session_status', {
    params: {
      session_id: sessionId,
      version
    },
    headers: {
      authorization
    }
  });
}

export async function createStream(participantId, streamType,
  numChannels, numStereoPairs, framesPerPacket, authorization) {

  return ApiService.post('/create_stream', {}, {
    params: {
      participant_id: participantId,
      stream_type: streamType
    },
    headers: {
      authorization,
      'x-meta-num_channels': numChannels,
      'x-meta-num_stereo_pairs': numStereoPairs,
      'x-meta-frames_per_packet': framesPerPacket,
    }
  });
}

export async function deleteStream(participantId, streamId, streamType, authorization) {
  return ApiService.delete('/delete_stream', {
    params: {
      participant_id: participantId,
      stream_id: streamId,
      stream_type: streamType
    },
    headers: {
      authorization
    }
  });
}

export async function requestJitter() {
  return ApiService.post('/test_for_echo', {}, {
    withCredentials: true
  });
}
