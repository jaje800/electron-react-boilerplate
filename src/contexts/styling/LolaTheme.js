import LolaTheme from 'styled-theming';
import BBRlight from '../../assets/images/BlueRoomImages/BBRlight.png';
import BBRdark from '../../assets/images/BlueRoomImages/BBRdark.png';
import toggleBaseLight from '../../assets/images/ThemeToggleImages/toggleBaseLight.svg';
import toggleBaseDark from '../../assets/images/ThemeToggleImages/toggleBaseDark.svg';
import toggleBaseLightStatic from '../../assets/images/ThemeToggleImages/toggleBaseLightStatic.svg';
import toggleBaseDarkStatic from '../../assets/images/ThemeToggleImages/toggleBaseDarkStatic.svg';
import { vwVal, pxBase } from '../../utils/sizingUtils';
/*---------------------------------------------------------------------------------------
Used to control theming throughout the app. Light and dark mode is defined, leaving room
for possible specialty themes to be added easily for special occasions.

Lola Theme contains:
    ColorPalette: Lola colors are defined here and used in the exported consts that follow
    colors: restates the colors using the ColorPalette so colors are easily imported
    backgroundColor: background of windows and elements
    toggleSwitch: background, glow, sun and moon motion
    backgroundColor: app wide
    textColor: text for windows and elements, high contrast option, and sidebar text colors
    btnBackgroundColor: background color and selected color for all buttons
    btnTextColor: text color for all buttons
    navBackgroundColor: navigation bar (side status bar)
    formFieldColor: form input field colors
    devOutline: container demarkation on screen layouts

Declarations specific to LolaGloabalStyles and FormStyleCompoenents are found at the top
of their corresponding files. Below declarations, although not theme dependent, are defined
here becasue they are used in both LolaGlobalStyles and FormStyleComponents
    fontSizes: predefined font sizes for the app
    fonts: app font names for main and strong
    btnWidths: for app buttons
---------------------------------------------------------------------------------------*/
export const sideBarWidth = 20; //vw points
export const sideBarWidthMIN = 110; //px - leave space for toggle
export const workingContainerWidth = 100 - sideBarWidth; //vw points
export const borderRadius = 6; //px
export const designWidth = 1000;
export const designHeight = 600;

/*-------------------------------------------------------------------------
ColorPalette: defined here so exported consts can reference
Make any changes to the global color palette here
-------------------------------------------------------------------------*/
const ColorPalette = {
  lolaBlack: 'rgb(0,0,0)', //#000000  //all text black
  lolaBlackSoft: 'rgb(36,37,38)', //#242526
  lolaBlackNav: 'rgb(26,26,26)', //#1A1A1A
  lolaBlue: 'rgb(7,47,117)', //#072F75 //unused
  lolaBlueDim: 'rgb(155, 192, 220)', //#9BC0DC  //join and start block titles
  lolaBlueNight: 'rgb(41,77,105)', //#294D69
  lolaBlueVolume: 'rgb(84, 158, 214)', //#549ed6
  lolaGray: 'rgb(112,112,112)', //#707070 //default by system, use sparingly
  lolaRed: 'rgb(218,30,58)', //#DA1E3A
  lolaRedDim: 'rgb(251, 178, 174)', //#fbb2ae //get rid of this
  lolaTeal: 'rgb(85,187,193)', //#55BBC1
  lolaWhite: 'rgb(255,255,255)', //#FFFFFF
  lolaWhiteDark: 'rgb(178,175,162)', //#B2AFA2
  lolaWhiteMedium: 'rgb(228,225,213)', //#E4E1D5  //medium for important text
  lolaWhiteBright: 'rgb(246,244,232)', //#F6F4E8  //lolaWihiteBright most important text
  lolaYellow: 'rgb(245,193,21)', //#F5C115
  lolaYellowDim: 'rgb(251,233,172)', //#FBE9AC
  lolaYellowSelect: 'rgb(252, 244, 215)', //#FCF4D7 //lolaYellowHover
};

/*-------------------------------------------------------------------------
colors: Quick reference to redefined ColorPalette. Makes for easy import
and use of colors in application js files
-------------------------------------------------------------------------*/
export const colors = {
  lolaBlack: ColorPalette.lolaBlack,
  lolaBlackSoft: ColorPalette.lolaBlackSoft,
  lolaBlackNav: ColorPalette.lolaBlackNav,
  lolaBlue: ColorPalette.lolaBlue,
  lolaBlueDim: ColorPalette.lolaBlueDim,
  lolaBlueNight: ColorPalette.lolaBlueNight,
  lolaBlueVolume: ColorPalette.lolaBlueVolume,
  lolaGray: ColorPalette.lolaGray,
  lolaRed: ColorPalette.lolaRed,
  lolaRedDim: ColorPalette.lolaRedDim,
  lolaTeal: ColorPalette.lolaTeal,
  lolaWhite: ColorPalette.lolaWhite,
  lolaWhiteDark: ColorPalette.lolaWhiteDark,
  lolaWhiteBright: ColorPalette.lolaWhiteBright,
  lolaYellow: ColorPalette.lolaYellow,
  lolaYellowDim: ColorPalette.lolaYellowDim,
  lolaYellowSelect: ColorPalette.lolaYellowSelect,
};

/*-------------------------------------------------------------------------
items for the blue room
-------------------------------------------------------------------------*/
export const BBRbackground = LolaTheme('mode', {
  dark: `${BBRdark}`,
  light: `${BBRlight}`,
});

/*-------------------------------------------------------------------------
items needed for the theme sensitive toggle switch (sun/moon)
-------------------------------------------------------------------------*/

export const toggleBackground = LolaTheme('mode', {
  dark: `${toggleBaseDark}`,
  light: `${toggleBaseLight}`,
});

export const toggleBackgroundStatic = LolaTheme('mode', {
  dark: `${toggleBaseDarkStatic}`,
  light: `${toggleBaseLightStatic}`,
});

export const toggleGlow = LolaTheme('mode', {
  dark: `${colors.lolaYellow}`,
  light: `${colors.lolaYellow}`,
});

export const sunMotion = LolaTheme('mode', {
  dark: 'translateY(100px)',
  light: 'translateY(0)',
});

export const moonMotion = LolaTheme('mode', {
  dark: 'translateY(0)',
  light: 'translateY(-100px)',
});

/*-------------------------------------------------------------------------
backgroundColor: defines the background of windows and page elements.
If updating colors, always update the ColorPalette and reference colors
by name here.
-------------------------------------------------------------------------*/
export const backgroundColor = LolaTheme('mode', {
  dark: ColorPalette.lolaBlackSoft,
  light: ColorPalette.lolaWhite,
});

/*-------------------------------------------------------------------------
textColor: defines the text color in windows and page elements.
If updating colors, always update the ColorPalette and reference colors
by name here.
textColorHighContrast: high contrast was from a brighter white for
important messages in dark mode longer being used, but leaving it in
in case anything changes
textColorSidebar: toggles opposite from the rest of the app
-------------------------------------------------------------------------*/
export const textColor = LolaTheme('mode', {
  dark: ColorPalette.lolaWhiteBright,
  light: ColorPalette.lolaBlack,
});

export const textColorHighContrast = LolaTheme('mode', {
  dark: ColorPalette.lolaWhiteBright,
  light: ColorPalette.lolaBlack,
});

export const textColorSidebar = LolaTheme('mode', {
  dark: ColorPalette.lolaBlack,
  light: ColorPalette.lolaWhite,
});

/*-------------------------------------------------------------------------
btnBackgroundColor: defines the background color of application buttons.
Buttons using images only will not be affected by changes here.
If updating colors, always update the ColorPalette and reference colors
by name here.
Still divided by theme in case this changes
-------------------------------------------------------------------------*/
export const btnBackgroundColor = LolaTheme('mode', {
  dark: ColorPalette.lolaYellowDim,
  light: ColorPalette.lolaYellowDim,
});

export const btnBackgroundSelect = LolaTheme('mode', {
  dark: ColorPalette.lolaYellowSelect,
  light: ColorPalette.lolaYellowSelect,
});

/*-------------------------------------------------------------------------
btnTextColor: defines the text color of application buttons.
Buttons using images only will not be affected by changes here.
If updating colors, always update the ColorPalette and reference colors
by name here.
Still divided by theme in case this changes
-------------------------------------------------------------------------*/
export const btnTextColor = LolaTheme('mode', {
  dark: ColorPalette.lolaBlack,
  light: ColorPalette.lolaBlack,
});

/*-------------------------------------------------------------------------
navBackgroundColor: defines the background color of the nav column
-------------------------------------------------------------------------*/

export const navBackgroundColor = LolaTheme('mode', {
  dark: ColorPalette.lolaBlackNav,
  light: ColorPalette.lolaBlueNight,
});

/*-------------------------------------------------------------------------
formFieldColor: the color of the inpout fields on forms
-------------------------------------------------------------------------*/

export const formFieldColor = LolaTheme('mode', {
  dark: ColorPalette.lolaWhiteDark,
  light: ColorPalette.lolaWhite,
});

/*-------------------------------------------------------------------------
devOutline: used to visualize content delineation. Currently set to
toggle on when dark mode is selected
-------------------------------------------------------------------------*/
export const devOutline = LolaTheme('mode', {
  dark: '0px', //change this value to see the bounding boxes in dark mode
  light: '0px',
});

/*-------------------------------------------------------------------------
fontSizes: defines application font sizes for various items.
Header array (hr:) of sizes defined here and used in GlobalStyles

a possible helpful calculation that could be expanded to accept width prop:
const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;
console.log("px2vw 32" ,px2vw(32))
-------------------------------------------------------------------------*/
//declaring text sizes as recorded in xd file at Robin's preferred screen width of 1000
let btnFontSz = 20;
let footerFontSz = 12;
let miniFontSz = 15;
let itsyFontSz = 11;
let inputFontSz = 21;
let goBtnFontSz = 35;
let blueFontSz = 30;
let txtFontSz = 20;
let hrFontSz = [40, 30, 27, 25, 22];

export const fontSizes = {
  button: `calc(${pxBase(btnFontSz)} + ${vwVal})`,
  gobutton: `calc(${pxBase(goBtnFontSz)} + ${vwVal})`,
  footer: `calc(${pxBase(footerFontSz)} + ${vwVal})`,
  mini: `calc(${pxBase(miniFontSz)} + ${vwVal})`,
  txt: `calc(${pxBase(txtFontSz)} + ${vwVal})`,
  itsy: `calc(${pxBase(itsyFontSz)} + ${vwVal})`,
  formInput: `calc(${pxBase(inputFontSz)} + ${vwVal})`,
  blueTitle: `calc(${pxBase(blueFontSz)} + ${vwVal})`,
  //consider naming the headers for easier reference
  hr1: `calc(${pxBase(hrFontSz[0])} + ${vwVal})`,
  hr2: `calc(${pxBase(hrFontSz[1])} + ${vwVal})`,
  hr3: `calc(${pxBase(hrFontSz[2])} + ${vwVal})`,
  hr4: `calc(${pxBase(hrFontSz[3])} + ${vwVal})`,
  hr5: `calc(${pxBase(hrFontSz[4])} + ${vwVal})`,
};

/*-------------------------------------------------------------------------
fonts: application fonts
Check LolaGlobalStyles for file import @font-face
-------------------------------------------------------------------------*/
export const fonts = {
  main: 'dinnarrow',
  strong: 'dindemi',
};

/*-------------------------------------------------------------------------
btWidths: Robin likes the button widths to be uniform within their visual block
-------------------------------------------------------------------------*/
let tryBtnSz = 80;
let formBtnSz = 50;
let goBtnSz = 48;

export const btnWidths = {
  main: `40vw`,
  try: `calc(${pxBase(tryBtnSz)} + ${vwVal})`,
  form: `10vw`,
  //form: `calc(${pxBase(formBtnSz)} + ${vwVal})`,
  go: `calc(${pxBase(goBtnSz)} + ${vwVal})`,
};
