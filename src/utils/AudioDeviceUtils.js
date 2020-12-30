const local_storage_key = 'audio-device-storage';

let userId;

function validateChannels(channels, dev) {
  if (channels.length > 0) return channels;

  let chnls = [];
  if (dev.num_channels > 0) chnls.push(0);
  if (dev.num_channels > 1) chnls.push(1);
  return chnls;
}

// convert an array of indexed channels into an equivalent
// "audio config".
//
//  audio devices have some number of input and output
//  channels.  Most UI's will present this idea to the user
//  as a simple array of available channels.  If the "channels"
//  parameter was [0, 3, 19] and "devId" was the ID of a device
//  with 20 audio channels, then this array is specifying the
//  first, fourth, and last of those channels.  A UI might present
//  a simple list of 20 checkboxes and the user may have checked
//  the first, fourth, and last item in that list.  But the
//  underlying audio engine deals with audio channels in groups
//  of channels (due to the way the even more underlying
//  hardware and drivers work).  An "audio config" version
//  of this same array identifies which group, and which
//  subchannel within that group, each of the given "indexed"
//  channels refers to.  Most of the audio engine APIs use
//  the "audio config" -style of specifying audio channels.
//
//  For this call, "devs" must either be availableAudioDevices.input
//  (if this array is being used to describe a microphone) or
//  availableAudioDevices.output (if it is a speaker)
export function channelIndexToConfig(devId, devs, channels) {
  if (devId in devs) {
    let dev = devs[devId];
    let config = {
      deviceId: devId,
      channels: [],
      sampleRate: dev.sample_rate,
    };
    for (let channel of validateChannels(channels, dev)) {
      let group_start = 0;
      for (let gi = 0, gl = dev.groups.length; gi < gl; gi++) {
        let channelsInGroup = dev.groups[gi];
        if (channel < group_start + channelsInGroup) {
          config.channels.push({
            stream: gi,
            channel: channel - group_start,
          });
          break;
        }
        group_start += channelsInGroup;
      }
    }
    return config;
  }
}

// the reverse of the channelIndexToConfig function.
//  This function returns the "indexed channel" array
//  form of the channels described by "config"
export function configToChannelIndex(config, devs) {
  if (config.deviceId != null && config.deviceId in devs) {
    let dev = devs[config.deviceId];
    let channelStart = [];
    let startingChannel = 0;
    for (let cs of dev.groups) {
      channelStart.push(startingChannel);
      startingChannel += cs;
    }
    let channels = [];
    for (let channel of config.channels) {
      if (channel.stream >= 0 && channel.stream < channelStart.length) {
        let c = channelStart[channel.stream] + channel.channel;
        if (c < dev.num_channels) channels.push(c);
      }
    }
    return channels;
  }
}

export function getFullDisplayName(devId, devs, channels) {
  if (devId in devs) {
    let dev = devs[devId];
    let deviceName = dev.name;
    let chnls = validateChannels(channels, dev);
    if (chnls.length !== dev.num_channels) {
      if (chnls.length > 1)
        deviceName += ` ch ${chnls[0] + 1}, ${chnls[1] + 1}`;
      else deviceName += ` ch ${chnls[0] + 1}`;
    }
    return deviceName;
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : r & (0x3 | 0x8);
    return v.toString(16);
  });
}

function load_users(id) {
  let storage = window.localStorage;
  let all_users = storage.getItem(local_storage_key);
  if (all_users == null) {
    all_users = {};
  } else {
    try {
      all_users = JSON.parse(all_users);
    } catch (err) {
      console.log('error parsing local user data');
      storage.clear(local_storage_key);
      all_users = {};
    }
  }
  if (all_users[id] == null) {
    all_users[id] = {};
  }
  return all_users;
}

// must be called whenever either the logged in user
// or available audio devices changes.  This updates
// all named microphone and speaker configs to specify
// for the given user to say whether they are currently
// available or not (they are available if they exist
// in availableDevices)
export function updateDeviceStatus(availableDevices, user) {
  if (availableDevices != null && user != null) {
    userId = user;
    let all_users = load_users(userId);
    let user_data = all_users[userId];
    if (typeof user_data.namedMics === 'object') {
      for (let [, mic] of Object.entries(user_data.namedMics)) {
        mic.avail = mic.config.deviceId in availableDevices.input;
      }
    } else {
      user_data.namedMics = {};
    }
    if (typeof user_data.namedSpeakers === 'object') {
      for (let [, speaker] of Object.entries(user_data.namedSpeakers)) {
        speaker.avail = speaker.config.deviceId in availableDevices.output;
      }
    } else {
      user_data.namedSpeakers = {};
    }
    window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
  }
}

// returns the id of the last microphone chosen by the user
export function getLastMicrophoneId() {
  if (userId != null) {
    let user_data = load_users(userId)[userId];
    if (
      typeof user_data.lastMic === 'string' &&
      user_data.lastMic in user_data.namedMics &&
      user_data.namedMics[user_data.lastMic].avail
    ) {
      return user_data.lastMic;
    }
  }
  return null;
}

// call this function any time a user specifies a microphone
// config they want to use.
export function setLastMicrophoneId(microphoneId) {
  if (userId != null) {
    let all_users = load_users(userId);
    let user_data = all_users[userId];
    user_data.lastMic = microphoneId;
    window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
  }
}

// returns a microphone config that is the current "default"
// one.  If the last microphone the user had chosen is
// currently available, the default one will be that one.
// If the last chosen one is not available and there is
// exactly one that is available that they have chosen some
// time in the past, then the default one is that one.
// Otherwise it returns null.  Returning null means the
// user must take some action to specify what microphone
// they want to use.
//
// Except in special cases, "availableDevices" should be
// const { availableDevices } = useContext(AudioDevicesContext)
export function defaultMicrophone(availableDevices) {
  if (availableDevices == null || userId == null) return null;

  let user_data = load_users(userId)[userId];
  if (
    user_data.lastMic != null &&
    typeof user_data.namedMics === 'object' &&
    user_data.lastMic in user_data.namedMics &&
    user_data.namedMics[user_data.lastMic].config.deviceId in
      availableDevices.input
  ) {
    return user_data.namedMics[user_data.lastMic].config;
  }

  if (typeof user_data.namedMics === 'object') {
    let numMatches = 0;
    let singleMic;
    for (let [id, mic] of Object.entries(user_data.namedMics)) {
      if (id in availableDevices.input) {
        ++numMatches;
        singleMic = mic;
      }
    }

    if (numMatches === 1) return singleMic.config;
  }

  return null;
}

// get the audio config for the microphone
// identified by microphoneId
export function getMicrophone(microphoneId) {
  if (userId == null || microphoneId == null) return null;

  let user_data = load_users(userId)[userId];
  if (
    typeof user_data.namedMics === 'object' &&
    microphoneId in user_data.namedMics
  ) {
    let mic = user_data.namedMics[microphoneId];
    if (mic.avail) return mic;
  }
  return null;
}

// save the given microphone object (in "audio config" format)
// into local storage and return the id for that object.  In
// CRUD, style if you are CReating a new microphone config
// pass null for "microphoneId".  This will cause it create a
// new uid (which it returns).  If you are Updating an existing
// microphone config pass the id of one your are updating
// and it will overwrite that one with the one you give it.
export function createMicrophone(config, name, microphoneId) {
  if (userId == null) return null;

  if (microphoneId == null) microphoneId = uuidv4();
  let all_users = load_users(userId);
  let user_data = all_users[userId];
  if (typeof user_data.namedMics !== 'object') user_data.namedMics = {};
  user_data.namedMics[microphoneId] = { config, name, avail: true };
  window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
  return microphoneId;
}

// Delete the given microphone from local storage
export function deleteMicrophone(microphoneId) {
  if (userId != null) {
    let all_users = load_users(userId);
    let user_data = all_users[userId];
    if (typeof user_data.namedMics === 'object') {
      delete user_data.namedMics[microphoneId];
      window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
    }
  }
}

// returns a dictionary, keyed by microphoneID,
// of all saved microphone configs
export function getAllMicrophones() {
  if (userId != null) {
    let user_data = load_users(userId)[userId];
    if (typeof user_data.namedMics === 'object') return user_data.namedMics;
  }
  return {};
}

// similar to getLastMicrophoneId
export function getLastSpeakerId() {
  if (userId != null) {
    let user_data = load_users(userId)[userId];
    if (
      typeof user_data.lastSpeaker === 'string' &&
      user_data.lastSpeaker in user_data.namedSpeakers &&
      user_data.namedSpeakers[user_data.lastSpeaker].avail
    )
      return user_data.lastSpeaker;
  }
  return null;
}

// similar to setLastMicrophoneId
export function setLastSpeakerId(speakerId) {
  if (userId != null) {
    let all_users = load_users(userId);
    let user_data = all_users[userId];
    user_data.lastSpeaker = speakerId;
    window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
  }
}

// similar to defaultMicrophone
export function defaultSpeaker(availableDevices) {
  if (availableDevices == null || userId == null) return null;

  let user_data = load_users(userId)[userId];
  if (
    user_data.lastSpeaker != null &&
    typeof user_data.namedSpeakers === 'object' &&
    user_data.lastSpeaker in user_data.namedSpeakers &&
    user_data.namedSpeakers[user_data.lastSpeaker].config.deviceId in
      availableDevices.output
  ) {
    return user_data.namedSpeakers[user_data.lastSpeaker].config;
  }

  if (typeof user_data.namedSpeakers === 'object') {
    let numMatches = 0;
    let singleSpeaker;
    for (let [id, speaker] of Object.entries(user_data.namedSpeakers)) {
      if (id in availableDevices.output) {
        ++numMatches;
        singleSpeaker = speaker;
      }
    }

    if (numMatches === 1) return singleSpeaker.config;
  }

  return null;
}

// similar to getMicrophone
export function getSpeaker(speakerId) {
  if (userId == null || speakerId == null) return null;

  let user_data = load_users(userId)[userId];
  if (
    typeof user_data.namedSpeakers === 'object' &&
    speakerId in user_data.namedSpeakers
  )
    return user_data.namedSpeakers[speakerId];
  return null;
}

// similar to createMicrophone
export function createSpeaker(config, name, speakerId) {
  if (userId == null) return null;

  if (speakerId == null) speakerId = uuidv4();
  let all_users = load_users(userId);
  let user_data = all_users[userId];
  if (typeof user_data.namedSpeakers !== 'object') user_data.namedSpeakers = {};
  user_data.namedSpeakers[speakerId] = { config, name, avail: true };
  window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
  return speakerId;
}

// similar to deleteMicrophone
export function deleteSpeaker(speakerId) {
  if (userId != null) {
    let all_users = load_users(userId);
    let user_data = all_users[userId];
    if (typeof user_data.namedMics === 'object') {
      delete user_data.namedSpeakers[speakerId];
      window.localStorage.setItem(local_storage_key, JSON.stringify(all_users));
    }
  }
}

export function getAllSpeakers() {
  if (userId != null) {
    let user_data = load_users(userId)[userId];
    if (typeof user_data.namedSpeakers === 'object')
      return user_data.namedSpeakers;
  }
  return {};
}
