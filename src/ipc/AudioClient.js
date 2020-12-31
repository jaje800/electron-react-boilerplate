'use-strict';

window.require =
  window.require ||
  function () {
    return { ipcRenderer: null };
  };
const { ipcRenderer } = window.require('electron');

function audio_render_all({ listenToID, sendToID }) {
  const myAsyncMsgBtn = document.querySelector(listenToID);
  myAsyncMsgBtn.addEventListener('click', () => {
    ipcRenderer.invoke('audio-core-get-devices', '').then((devices) => {
      let msg = JSON.stringify(devices, null, 2);
      console.log(msg);
      document.querySelector(sendToID).innerHTML = msg;
    });
  });
}

function audio_client_type() {
  if (ipcRenderer != null) return 'native';
  return 'none';
}

function is_wifi_or_worse() {
  return ipcRenderer.invoke('audio-core-is-wifi-or-worse', '');
}

function audio_reinit() {
  ipcRenderer.send('audio-core-reinit', '');
}

function get_devices() {
  return ipcRenderer.invoke('audio-core-get-devices', '');
}

function acquire_engine() {
  ipcRenderer.send('audio-core-acquire-engine', '');
}

function release_engine() {
  ipcRenderer.send('audio-core-release-engine', '');
}

function remove_audio_process(id) {
  ipcRenderer.send('audio-core-remove-audio-process', id);
}

function get_sample_rate() {
  return ipcRenderer.invoke('audio-core-get-sample-rate', '');
}

function set_sample_rate() {
  return ipcRenderer.send('audio-core-set-sample-rate', '');
}

function create_local_participant(participantInfo) {
  ipcRenderer.send('audio-core-create-local-participant', participantInfo);
}

function delete_local_participant(id) {
  ipcRenderer.send('audio-core-delete-local-participant', id);
}

function add_remote_participant(participantInfo) {
  ipcRenderer.send('audio-core-add-remote-participant', participantInfo);
}

function remove_remote_participant(participantInfo) {
  ipcRenderer.send('audio-core-remove-remote-participant', participantInfo);
}

function create_audio_encoder(info) {
  return ipcRenderer.invoke('audio-core-create-encoder', info);
}

function create_audio_decoder(info) {
  return ipcRenderer.invoke('audio-core-create-decoder', info);
}

function create_direct_monitor(info) {
  return ipcRenderer.invoke('audio-core-create-direct-monitor', info);
}

function start_audio_metering(monitored_devices, algorithm) {
  return ipcRenderer.invoke('audio-core-create-meter', {
    monitored_devices,
    algorithm,
  });
}

function get_audio_meter_levels(meter_id) {
  return ipcRenderer.invoke('audio-core-get-levels', meter_id);
}

function stop_jittering(jitter_id) {
  ipcRenderer.send('audio-core-delete-jitter-meter', jitter_id);
}

function start_measuring_jitter(info) {
  return ipcRenderer.invoke('audio-core-create-jitter-meter', info);
}

function get_jitter(jitter_id) {
  return ipcRenderer.invoke('audio-core-get-jitter', jitter_id);
}

function set_stream_playback_params(stream_id, params) {
  return ipcRenderer.invoke('audio-core-set-stream-playback-params', {
    stream_id,
    params,
  });
}

function set_monitor_stream(channel_one_weight, channel_two_weight) {
  return ipcRenderer.invoke('audio-core-set-monitor-stream', {
    channel_one_weight,
    channel_two_weight,
  });
}

function get_participant_audio_info(localParticipantId) {
  return ipcRenderer.invoke(
    'audio-core-get-participant-audio-info',
    localParticipantId
  );
}

export {
  audio_client_type,
  audio_render_all,
  is_wifi_or_worse,
  audio_reinit,
  get_devices,
  acquire_engine,
  release_engine,
  remove_audio_process,
  get_sample_rate,
  set_sample_rate,
  create_local_participant,
  delete_local_participant,
  add_remote_participant,
  remove_remote_participant,
  create_audio_encoder,
  create_audio_decoder,
  create_direct_monitor,
  start_audio_metering,
  get_audio_meter_levels,
  start_measuring_jitter,
  stop_jittering,
  get_jitter,
  set_stream_playback_params,
  set_monitor_stream,
  get_participant_audio_info,
};
