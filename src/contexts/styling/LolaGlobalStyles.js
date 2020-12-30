import { createGlobalStyle } from 'styled-components';
import {
  fontSizes,
  fonts,
  colors,
  backgroundColor,
  btnBackgroundColor,
  btnBackgroundSelect,
  btnTextColor,
  borderRadius,
} from './LolaTheme';
import din_2014_narrow_woff from '../../assets/fonts/din-2014-narrow2.woff';
import din_2014_narrow_woff2 from '../../assets/fonts/din_2014_narrow.woff2';
import din_2014_narrowdemi_woff from '../../assets/fonts/din_2014_narrowdemi.woff';
import din_2014_narrowdemi_woff2 from '../../assets/fonts/din_2014_narrowdemi.woff2';

const btnBorderSize = '1px';

const LolaGlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

@font-face {
    font-family: ${fonts.main};
    src: local(${fonts.main}),
    url(${din_2014_narrow_woff}) format('woff2'),
    url(${din_2014_narrow_woff2}) format('woff'); /* app uses woff */
    font-synthesis: none;
    font-style: normal;
    }

@font-face {
    font-family: ${fonts.strong};
    src: local(${fonts.strong}),
    url(${din_2014_narrowdemi_woff}) format('woff2'),
    url(${din_2014_narrowdemi_woff2}) format('woff'); /* app uses woff */
    font-synthesis: none;
    font-style: normal;
    }

html {
    height: 100%;
    //margin: 0;   /* suggested for better svg placement */
}

select {
}

//option styling is determined by each individual OS.
//to get the dropdown to look right, we may need to build it entirely
//from the bottom up without using dropdown/select/option

button {
    cursor: pointer;
    font-family: ${fonts.main};
    border-radius: ${borderRadius}px;
    background-color: ${btnBackgroundColor};
    color: ${btnTextColor};
    margin: 10px;
    border: ${btnBorderSize} solid ${btnBackgroundColor}; /* so button wont bounce when border added on hover */
    font-size: ${fontSizes.button}; //LolaButton recalculates font size, so changing it here will NOT change a LolaButton font size
    align-self: center; /* button will not stretch to width/height of column */
    transition: .25s all ease-in-out; /* used when button is back out of hover */
    &:disabled {
        opacity: 0.4;
        border: ${btnBorderSize} solid ${colors.LolaGray}; /* so button wont bounce when border added on hover */
        :hover {
            border: ${btnBorderSize} solid ${colors.LolaGray};
        }
    }
    &:hover {
        background-color: ${btnBackgroundSelect};
        border: ${btnBorderSize} solid ${colors.lolaBlueDim};
        transition: all ease-out;
    }
    &:focus {
        outline: none;
        //background-color: ${colors.backgroundColor};
        //border: ${btnBorderSize} solid ${btnBackgroundColor};
        //color: ${colors.lolaTeal};
        //transition: all ease-out;

    }
    &:active {
        /* for when button is being pressed */
        outline: none;
        //border: ${btnBorderSize} solid ${btnBackgroundColor};
        //box-shadow: ${colors.btnTextColor} 0px 0px 2px 1px;
        //color: ${colors.lolaBlue};
        //transition: all ease-out;
    }
}

p {
    font-family: ${fonts.main};
    font-size: ${fontSizes.txt};
    line-height: 1.5em;
    font-weight: normal;
}

h1 {
    font-family: ${fonts.main};
    font-size: ${fontSizes.hr1};
    line-height: 1.1em;
    font-weight: normal;
}

h2 {
    font-family: ${fonts.main};
    font-size: ${fontSizes.hr2};
    line-height: 1.5em;
    font-weight: normal;
}

h3 {
    font-family: ${fonts.main};
    font-size: ${fontSizes.hr3};
    line-height: 1.3em;
    font-weight: normal;
}

h4 {
    font-family: ${fonts.main};
    font-size: ${fontSizes.hr4};
    line-height: 1.2em;
    font-weight: normal;
}

h5 {
    font-family: ${fonts.main};
    font-size: ${fontSizes.hr5};
    line-height: 1.1em;
    font-weight: normal;
}

body {
    font-family: ${fonts.main};
    font-weight: normal;
    background: ${backgroundColor}; /* eliminates inverted border */
    height: 95vh;  /* eliminates activation of scroll bar */
    //margin: 0;    /* suggested for better svg placement */
}

`;

export default LolaGlobalStyles;
