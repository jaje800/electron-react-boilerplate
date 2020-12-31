'use-strict';
const audiocore = require('audio-core');
const { ipcMain } = require('electron');

function init() {
  ipcMain.on('audio-core-reinit', (event, arg) => {
    audiocore.audio_reinit();
  });

  ipcMain.handle('audio-core-get-devices', async (event, arg) => {
    return audiocore.get_audio_devices();
  });

  ipcMain.handle('audio-core-is-wifi-or-worse', async (event, arg) => {
    return audiocore.is_wifi_or_worse();
  });

  ipcMain.on('audio-core-acquire-engine', (event, arg) => {
    audiocore.acquire_audio_engine();
  });

  ipcMain.on('audio-core-release-engine', (event, arg) => {
    audiocore.release_audio_engine();
  });

  ipcMain.on('audio-core-remove-audio-process', (event, id) => {
    audiocore.remove_audio_process(id);
  });

  ipcMain.handle('audio-core-get-sample-rate', async (event, arg) => {
    return audiocore.get_engine_sample_rate();
  });

  ipcMain.on('audio-core-set-sample-rate', (event, sample_rate) => {
    audiocore.set_engine_sample_rate(sample_rate);
  });

  ipcMain.on('audio-core-create-local-participant', (event, pInfo) => {
    audiocore.create_local_participant(
      pInfo.synchronicityUrl,
      pInfo.sessionId,
      pInfo.participantId,
      pInfo.participantAuth,
      pInfo.oneTimeAuth
    );
  });

  ipcMain.on('audio-core-delete-local-participant', (event, id) => {
    audiocore.delete_local_participant(id);
  });

  ipcMain.on('audio-core-add-remote-participant', (event, pInfo) => {
    audiocore.add_remote_participant(
      pInfo.localParticipantId,
      pInfo.remoteParticipantId,
      pInfo.remoteParticipantIpOrHost,
      pInfo.remoteParticipantPort,
      pInfo.remoteParticipantName,
      pInfo.remoteParticipantNetworkType
    );
  });

  ipcMain.on('audio-core-remove-remote-participant', (event, pInfo) => {
    audiocore.remove_remote_participant(
      pInfo.localParticipantId,
      pInfo.remoteParticipantId
    );
  });

  ipcMain.handle('audio-core-create-encoder', async (event, info) => {
    return audiocore.create_audio_encoder(
      info.deviceId,
      info.channels,
      info.numStereoPairs,
      info.participantId,
      info.streamId
    );
  });

  ipcMain.handle('audio-core-create-decoder', async (event, info) => {
    return audiocore.create_audio_decoder(
      info.deviceId,
      info.weightedChannels,
      info.localParticipantId,
      info.remoteParticipantId,
      info.remoteParticipantName,
      info.streamId,
      info.sampleRate,
      info.numStereoPairs,
      info.framesPerEncodedPacket
    );
  });

  ipcMain.handle('audio-core-create-direct-monitor', async (event, info) => {
    return audiocore.create_direct_monitor(
      info.srcDeviceId,
      info.dstDeviceId,
      info.routes
    );
  });

  ipcMain.handle('audio-core-get-participant-audio-info', async (event, id) => {
    return audiocore.get_participant_audio_info(id);
  });

  ipcMain.handle('audio-core-create-meter', async (event, info) => {
    return audiocore.create_audio_meter(info.monitored_devices, info.algorithm);
  });

  ipcMain.handle('audio-core-get-levels', async (event, meter_id) => {
    return audiocore.get_audio_meter_levels(meter_id);
  });

  ipcMain.handle(
    'audio-core-set-stream-playback-params',
    async (event, info) => {
      return audiocore.set_stream_playback_params(info.stream_id, info.params);
    }
  );

  ipcMain.handle('audio-core-set-monitor-stream', async (event, info) => {
    return audiocore.set_monitor_stream(
      info.channel_one_weight,
      info.channel_two_weight
    );
  });

  ipcMain.handle('audio-core-create-jitter-meter', async (event, info) => {
    return audiocore.create_jitter_meter(info.synchronicityUrl, info.id);
  });

  ipcMain.on('audio-core-delete-jitter-meter', (id) => {
    audiocore.delete_jitter_meter(id);
  });

  ipcMain.handle('audio-core-get-jitter', async (event, id) => {
    return audiocore.get_jitter(id);
  });
}

module.exports = {
  init,
};
