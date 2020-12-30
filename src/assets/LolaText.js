// text patterns shared over multiple screen
const welcomeBack = 'welcome back, ';
const welcomeComma = 'welcome, ';
const saveBtnTxt = 'save';
const websiteHelpBtn = 'view troubleshooting help on the website';
const continueAnyways = 'I understand and want to continue anyway';
const BBRdemoMode = 'take me to the BigBlueRoom in demo mode';
const noInternet = 'no internet detected!';
// const securityPlaceholder = '*******';
// const goBtnTxt = 'go!';

// contains text for the Landing Page (NetworkScan screen) and the FirstSignIn screen
export const FirstTxt = {
  jamwerksCR: '© jamwerks, inc. 2020', //may reinstate in status bar, keeping here
  jamwerksVersion: 'version 1.6',
  scanningInternet: '...scanning internet stability and audio setups...',
  welcomeComma: welcomeComma,
  welcomeBack: welcomeBack,
  gotItBtn: 'got it!',
  firstBBRdemoBtn: BBRdemoMode,
  signInExplanation:
    'please be sure to have the mic and headphones you plan to use powered up, plugged in, and ready to go!',
};

export const StatusBarTxt = {
  calculating: 'calculating...',
  scanning: '...scanning the internet...',
  NWstatusTitle: 'internet status',
  MicStatusTitle: 'microphones',
  HPStatusTitle: 'headphones',
  serverRgn: 'server region:',
  jitter: 'jitter ms',
  latency: 'latency ms',
  noValue: 'N/A',
  noRegion: 'none found',
  NWwifiMessage: 'wifi - poor', //pass, flagged yellow
  NWwifiComment: "use ethernet - it's better!",
  NWunstableMessage: 'ethernet - poor', //pass, flagged yellow
  NWunstableComment: 'unstable internet service',
  NWethernetMessage: 'ethernet - great!', //pass, teal
  NWethernetComment: "lookin' good!",
  NWnoneMessage: 'no internet',
  NWnoneComment: "we can't find the world wide web",
  noneDetected: 'none detected',
};

export const NetworkTxt = {
  usingWifiTitle: 'wifi warning!',
  usingWifiSubtitle: "you're on wifi - ethernet is better!",
  usingWifiNotification:
    'heads up! you are using a wifi connection. please connect to the internet via ethernet cable. in some cases this may mean you need to string a long ethernet cable from your router to your computer! if you continue on wifi, your Session experience may be poor.',
  unstableInternetTitle: 'unstable or inconsistent internet warning!',
  unstableInternetSubtitle: 'unstable internet',
  unstableInternetNotification:
    'heads up! it appears your internet connection is highly unstable or spotty and your Session experience will be poor.',
  noInternetTitle: noInternet,
  noInternetSubtitle: noInternet,
  noInternetNotification:
    'unfortunately, we are unable to find any internet connection. please check your connections and try again. if you continue, you will only be able to use the BigBlueRoom in demo mode.',
  NWcontinueAnywayBtn: continueAnyways,
  usingEthernetTitle: 'excellent ethernet',
  usingEthernetSubtitle: 'your connection is amazing!',
};

export const MicTxt = {
  noMicTitle: 'no microphones detected',
  noMicSubtitle:
    'unfortunately, we have been unable to detect any usable microphone setups. please check your connections and try again.',
  noMicExplanation:
    'if you discover a loose connection, or an improperly connected microphone, plug it in correctly now, and lola will detect it. if you continue to have issues, please visit the troubleshooting page on our website. if you wish to proceed without a microphone, you may enter the BigBlueRoom in demo mode and learn to use the controls.',
  MwebsiteHelpBtn: websiteHelpBtn,
  MpathToBBRbtn: 'continue to headphone check, then to the BigBlueRoom',
  mic1Title: 'microphone setup 1',
  mic1Subtitle:
    'congratulations, we have detected one or more active microphones!',
  mic1Instructions:
    'please clap or speak into the microphone you believe you are using to allow lola to check your sound inputs.',
  mic1seeMeter: 'you should see the meter registering your sounds.',
  mic1DropDownHeader:
    'only active microphones are listed in the dropdown menu!',
  useThisMicBtn: 'I want to use this microphone',
  advMicSetupBtn: 'advanced mic setup',
  mic2Title: 'microphone setup 2',
  mic2Subtitle:
    'great! now that you’ve chosen this microphone setup, please give it a name (or use the default name) and we will save it in your microphones settings list.',
  mic2Explanation:
    'you can change this at any time in the BigBlueRoom microphone settings list.',
  MsaveBtn: saveBtnTxt,
  advMicTitle: 'advanced microphone setup',
  advMicInstructions:
    'this is a list of the microphones we are detecting as you speak. only active and live microphones will appear in the menu.',
  activeMicsLabel: 'active microphones',
  chosenMicLabel: 'chosen mics for this setup',
  advMicExplanationOne: 'one channel selected = mono setup',
  advMicExplanationTwo:
    'two channels selected = stereo setup, first selected is left, second is right channel',
  useAdvMicBtn: 'use this microphone setup',
  defaultMicBtn: 'go back to default mic setup',
};

export const HeadphTxt = {
  noHeadphTitle: 'no headphones detected',
  noHeadphSubtitle:
    'unfortunately, we have been unable to detect any usable headphone setups. please check your connections and try again.',
  noHeadphExplanation:
    'if you discover a loose connection, or improperly connected headphones, plug them in correctly now, and lola will detect it. if you continue to have issues, please visit the troubleshooting page on our website. if you wish to proceed without headphones, you may enter the BigBlueRoom in demo mode and learn to use the controls, but will be unable to hear anything.',
  HPwebsiteHelpBtn: websiteHelpBtn,
  HPpathToBBRbtn: BBRdemoMode,
  headph1Title: 'headphone setup 1',
  headph1Subtitle:
    "great! now that we have your microphone setup saved, let's choose a headphone set as well.",
  headph1Explanation:
    'please check to see that your headphones are completely plugged in.',
  // headph1Subtitle:
  // "great! now that we have your microphone setup working, let's test and make sure your headphones work as well.",
  // headph1Explanation:
  // 'If you can’t hear anything in any headphones, check to see if your headphones are completely plugged in, check to see if your headphones work with another device, or try a different headphone jack on your equipment (computer headphone jack, microphone headphone jack, etc...)',
  // headphLabel: 'tone is playing',
  // tryNextBtn: 'try next',
  // useTheseHeadphBtn: 'I can hear the tone - use these headphones',
  headphLabel: 'pair mic with',
  tryNextBtn: 'next',
  useTheseHeadphBtn: 'use these headphones',
  noWorkingHeadphBtn: "I don't have any working headphones",
  unusableHeadphTitle: 'unusable output setup detected',
  unusableHeadphSubtitle:
    'it looks like the only sound output option for your setup is the built-in speakers output associated with your computer.',
  unusableHeadphExplanation:
    'lola powered by jamwerks does not currently support this option. any type of wired headphones will work, and there are many options out there in all price ranges.',
  enterBBRdemoMode:
    'you will be able to enter the BigBlueRoom in demo mode only',
  headph2Title: 'headphone setup 2',
  headph2Subtitle:
    'great! now that you’ve chosen these headphones, please give it a name (or use the default name) and we will save it in your headphones settings list',
  headph2Explanation:
    'you can change this at any time in the BigBlueRoom headphones settings list.',
  HPsaveBtn: saveBtnTxt,
  HPcontinueAnywayBtn: continueAnyways,
};

export const ChecklistTxt = {
  passTitle: "congratulations, you're all set!",
  plsCheck: 'please check',
  internetPass: 'your internet looks great!',
  internetWifi:
    'you acknowledge that you are on wifi, and understand that your experience will be less than optimal',
  internetUnstable:
    'you acknowledge your ethernet connection is unstable or spotty, and understand your experience will less than optimal',
  audioPass: 'your audio setup has been selected!',
  hpLabel: 'headphones:',
  explanation:
    'we will save these choices for next time, but you can always change things in the setup menu in the BigBlueRoom!',
  BBRbtn: 'take me to the BigBlueRoom!',
};

export const BBRtxt = {};
