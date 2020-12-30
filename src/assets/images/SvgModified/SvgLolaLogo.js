import React, { useState } from 'react';
import { colors, fontSizes } from '../../../contexts/styling/LolaTheme';
import { useStyledTheme } from '../../../utils/themeUtils';
import { triosdark } from '../../sounds/triosdark';
import { trioslight } from '../../sounds/trioslight';
import { sample } from 'lodash';
//import { keyframes } from 'styled-components';
//import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

let trioarray;
let textcolor;
function randomTrio(mode, sidebar) {
  if (mode === 'dark') {
    trioarray = triosdark;
    textcolor =
      sidebar === 'true' ? `${colors.lolaBlack}` : `${colors.lolaWhiteBright}`;
  } else {
    trioarray = trioslight;
    textcolor =
      sidebar === 'true' ? `${colors.lolaWhiteBright}` : `${colors.lolaBlack}`;
  }
  let mp3trio = sample(trioarray);
  let trio = [
    new Audio(mp3trio[0]),
    new Audio(mp3trio[1]),
    new Audio(mp3trio[2]),
  ];
  return trio;
}

function SvgLolaLogo({ quiet, w, h, message, jamwerks, sidebar }) {
  //const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  // const svgvariant = {
  //   initial: { rotate: -180 },
  //   animate: {
  //     rotate: 0,
  //     transition: { duration: 1 },
  //   },
  // };
  // const dotvariant = {
  //   initial: { scale: 1 },
  //   animate: { scale: 0.5 },
  //   transition: {
  //     duration: 2,
  //   },
  // };
  let curtheme = useStyledTheme();
  let curtrio = randomTrio(curtheme.mode, sidebar);

  //resizes the viewbox if the jamwerks text is not turned on
  let vb = jamwerks === 'true' ? '0 0 356.18 263.97' : '0 0 324.31 212.45';

  function handleClick(dot) {
    //gives an alternative interaction if the logo needs to not produce sound
    //would love to turn this into dots moving or switching spots or something better
    //when I understand more about separating out animation
    if (quiet === 'true') {
      let val = scale < 0.2 ? 1 : scale - 0.2;
      setScale(val);
    } else {
      dot != null && curtrio[dot].play();
    }
  }
  return (
    <motion.svg
      onClick={() => {
        handleClick(null);
      }}
      animate={{ scale: scale }}
      id="b95a9028-61ba-4dca-9098-d02028f5ed32"
      data-name="lola surrounded by stars"
      viewBox={vb}
      width={w ? w : '100%'}
      height={h ? h : '100%'}
    >
      <text
        textAnchor="end"
        x="175"
        y="-20"
        fill={textcolor}
        fontSize={fontSizes.hr2}
      >
        {message}
      </text>

      <defs>
        <style>
          {`.a5f37177-7baa-4704-b6ee-2b1c569dfe8e{fill:${colors.lolaYellow}`}
        </style>
      </defs>

      {jamwerks === 'true' ? (
        <>
          <g id="b6ad0ba1-7329-45ef-8910-c5044a604098" data-name="jamwerks">
            <path
              fill={textcolor}
              d="M704.84 522.8c0 6.4-2 9.48-8.8 9.48v-4.56c3.88 0 3.88-2.83 3.88-6.15V489.8h4.92zm-5.23-44.7H705v5.54h-5.42zM719.8 502.79h4.87v-3.57c0-4.25-1.23-5.36-4.74-5.36-3 0-4.13.43-5.36 2.95l-3.75-2.4c1.72-3.57 4.3-5.11 9.17-5.11 6.34 0 9.6 2.53 9.6 9.92v21.36h-4.92v-3c-.93 2.1-2.28 3.51-5.73 3.51-5.66 0-8.74-3.51-8.74-9.48 0-6.67 4-8.82 9.6-8.82zm4.87 4.18h-4.56c-3.63 0-5 1.67-5 4.74 0 3.45 1.79 4.81 4.62 4.81 2.65 0 4.93-.87 4.93-7.76zM736 489.8h4.93v3a6.35 6.35 0 015.91-3.51 7.27 7.27 0 017.2 4.87c1.6-3.39 4.07-4.87 7.21-4.87 5 0 8.62 4.07 8.62 12.07v19.21h-4.93v-19.14c0-6-2.15-7.57-4.74-7.57-2.77 0-4.8 2.34-4.8 7.51v19.21h-4.93v-19.15c0-6-2.15-7.57-4.74-7.57-2.83 0-4.8 2.59-4.8 7.51v19.21H736zM785.06 520.58h-4.12l-7.39-30.78h5.29l4.37 21.61 5.55-21.61h4.67l5.57 21.79 4.31-21.79h5.23l-7.26 30.78h-4.19l-6-22.6zM830.5 516c-1.67 3.63-4.44 5.11-8.81 5.11-7.08 0-10.65-5.35-10.65-13.91v-4.07c0-8.74 3.51-13.79 9.85-13.79 6.71 0 9.91 4.25 9.91 13.79v3.21H816v.86c0 5.29 1.48 9.48 5.67 9.48 3 0 4-1.17 5.23-3.2zM816 502h9.92c0-6.41-1.48-8.25-5-8.25-3.79-.01-4.92 2.76-4.92 8.25zM849.89 496.38c-1-1.78-2.16-2.52-3.82-2.52-2.77 0-4.56 2.34-4.56 7.45v19.27h-4.92V489.8h4.92v3a5.92 5.92 0 015.61-3.51c2.89 0 5 1.42 6.58 4.19zM875.74 489.8l-8.92 12.56 10.34 18.22h-5.79l-7.75-14-2.28 3.14v10.84h-4.93V478.1h4.93v24.07l8.74-12.37zM894.15 497c-1.23-2.16-2.34-3.14-5.35-3.14-2.65 0-4.19 1.42-4.19 4.12 0 2.9 1.6 4.13 4.92 4.87 4.44 1 8.93 2.83 8.93 9.17 0 5.36-3.14 9.05-9.42 9.05-5 0-7.76-1.78-9.67-5l3.51-2.84c1.24 2.22 2.84 3.27 5.85 3.27 3.2 0 4.81-1.6 4.81-4.37s-1.11-3.94-5.48-4.93c-4.13-.92-8.38-3.2-8.38-9.17 0-5.11 3.33-8.75 8.93-8.75 4.06 0 7.14 1.3 9.11 5.11z"
              transform="translate(-542.28 -268.31)"
            />
          </g>
          <g id="a5fb27dd-6e67-4f11-a28a-97e950e4c6aa" data-name="powered by">
            <path
              fill={textcolor}
              d="M722 457.78c3.55 0 5.47 2.61 5.47 7.75v3c0 5.22-1.88 7.83-5.47 7.83-2.28 0-3.7-.87-4.49-2.86v9.5h-1.09v-25h1.09v2.64c.79-2.03 2.21-2.86 4.49-2.86zm4.38 10.72v-3c0-4.45-1.45-6.66-4.38-6.66-3.44 0-4.49 2.6-4.49 6.41v3.26c0 4 .9 6.71 4.49 6.71 3 .03 4.38-2.22 4.38-6.72zM741.68 468.58c0 5.14-2.07 7.75-5.66 7.75s-5.65-2.61-5.65-7.75v-3.05c0-5.14 2.07-7.75 5.65-7.75s5.66 2.61 5.66 7.75zm-1.09 0v-3.05c0-4.49-1.6-6.66-4.57-6.66s-4.56 2.17-4.56 6.66v3.05c0 4.49 1.59 6.67 4.56 6.67s4.57-2.18 4.57-6.67zM748.52 476.12h-1.08l-4-18.12h1.12l3.51 16.16 4.3-16.16h1.08l4.28 16.16 3.55-16.16h1.12l-4 18.12h-1.09l-4.4-16.12zM774.76 473.47a5.18 5.18 0 01-4.75 2.86c-3.73 0-5.87-2.82-5.87-7.83v-3c0-5.14 2-7.75 5.37-7.75s5.36 2.61 5.36 7.75v1.82h-9.64v1.15c0 4 1.41 6.75 4.75 6.75a4.14 4.14 0 003.91-2.4zm-9.53-7.21h8.55c0-5-1.3-7.39-4.27-7.39s-4.28 2.42-4.28 7.39zM786.58 461a3.68 3.68 0 00-3.19-2.13c-2.51 0-3.66 2.82-3.66 6.7v10.55h-1.09V458h1.09v2.82c.65-1.81 1.92-3 3.76-3a4.53 4.53 0 014 2.53zM799.29 473.47a5.17 5.17 0 01-4.74 2.86c-3.74 0-5.87-2.82-5.87-7.83v-3c0-5.14 2-7.75 5.36-7.75s5.36 2.61 5.36 7.75v1.82h-9.64v1.15c0 4 1.42 6.75 4.75 6.75a4.14 4.14 0 003.91-2.4zm-9.53-7.21h8.56c0-5-1.31-7.39-4.28-7.39s-4.28 2.42-4.28 7.39zM812.41 451.11h1.09v25h-1.09v-2.65c-.79 2-2.21 2.86-4.49 2.86-3.59 0-5.47-2.61-5.47-7.83v-3c0-5.14 1.92-7.75 5.47-7.75 2.28 0 3.7.83 4.49 2.86zm0 17.43v-3.26c0-3.81-1-6.41-4.49-6.41-2.94 0-4.39 2.21-4.39 6.66v3c0 4.53 1.42 6.75 4.39 6.75 3.59-.03 4.49-2.75 4.49-6.74zM830.68 457.78c3.55 0 5.47 2.61 5.47 7.75v3c0 5.22-1.89 7.83-5.47 7.83a4.29 4.29 0 01-4.5-2.86v2.65h-1.08v-25h1.08v9.53c.82-2.07 2.21-2.9 4.5-2.9zm4.38 10.72v-3c0-4.45-1.45-6.66-4.38-6.66-3.45 0-4.5 2.6-4.5 6.41v3.26c0 4 .91 6.71 4.5 6.71 2.97.03 4.38-2.22 4.38-6.72zM843.76 476.51l-6-18.51h1.16c1.38 4.34 2.76 8.58 5.33 16.74l4.58-16.74H850l-5.26 19c-1.12 4.35-2.18 6.05-5.15 6.05v-1.09c2.47 0 3-1.41 4.1-5.14z"
              transform="translate(-542.28 -268.31)"
            />
          </g>
        </>
      ) : null}

      <rect
        id="a56e02bf-9d81-4412-b08d-57c152b7c424"
        data-name="blue dot 1"
        className="blueDot"
        cursor="pointer"
        onClick={() => {
          handleClick(0);
        }}
        x={683.69}
        y={284.55}
        width={19.14}
        height={20.15}
        rx={4.42}
        transform="rotate(-135 366.551 272.777)"
        fill="#549ed6"
      />
      <rect
        id="b1892a83-3e8e-4dd8-b70e-b4b67113606e"
        data-name="red dot 1"
        className="redDot"
        cursor="pointer"
        onClick={() => {
          handleClick(1);
        }}
        x={542.18}
        y={386.79}
        width={19.71}
        height={14.83}
        rx={6.24}
        transform="rotate(-40.58 -81.97 993.431)"
        fill={colors.lolaRed}
      />
      <rect
        id="b0e73f9f-3b4f-4ce3-af8d-425732737f09"
        data-name="teal dot 1"
        className="tealDot"
        cursor="pointer"
        onClick={() => {
          handleClick(2);
        }}
        x={849.15}
        y={412.83}
        width={17.24}
        height={14.41}
        rx={6.06}
        transform="rotate(-13.58 -540.097 2563.089)"
        fill={colors.lolaTeal}
      />
      <path
        id="fad7df47-e1df-4992-aac6-a112b1d6bb7d"
        data-name="a"
        className="a5f37177-7baa-4704-b6ee-2b1c569dfe8e"
        d="M791.21 344.53c9 2.32 14.28 9.56 18.8 15.83 5.17 7.15 8.33 14.75 10.89 24.73 7.68 30.05 4.69 51.92 9.56 53.07 2.63.62-5.11 8.43-6.14 6.49-1.32-2.44-1.84-13.65-17.32-9.09-24.82 7.27-29.92 11.21-35.62 7.91-7-4.06-8.88-15.62-6.92-23.74 2.58-10.71 12-16.15 14.84-17.82 11.14-6.45 17.55-1.93 22.76-7.91 5.75-6.61 3.84-19-1-26.72-1.84-2.94-5.67-9.09-11.88-9.89-10.28-1.33-16.85 13.36-23.74 10.88-3.44-1.23-5.39-6.17-5-9.89 1.2-9.23 17.76-17.19 30.77-13.85zm17.07 60.35c-5.3-1.53-9.89.43-15.83 3-5.59 2.39-9.86 4.22-12.86 8.91s-4.92 12.36-2 14.84 8.47-3.24 26.71-9.9c8.95-3.26 13.3-3.91 13.86-6.92.7-3.7-4.68-8.42-9.88-9.93z"
        transform="translate(-542.28 -268.31)"
      />
      <path
        id="a49ceb1d-b2a8-4cf5-828f-9d8ea3a8c34b"
        data-name="lower case l"
        className="a5f37177-7baa-4704-b6ee-2b1c569dfe8e"
        d="M719 272.37c-3 12 13.63 63 15 98.62 1.4 35.19-16.92 59.38-6 67.68a11.51 11.51 0 0010.53 1.5c7.2-2.69 11.32-14.41 10.53-66.18-.75-48.33-6-102.39-16.67-105-4.97-1.19-12.25-1.27-13.39 3.38z"
        transform="translate(-542.28 -268.31)"
      />
      <path
        id="e5896567-18ea-47dd-a94e-13a42607a788"
        data-name="o"
        className="a5f37177-7baa-4704-b6ee-2b1c569dfe8e"
        d="M682.07 346.17c22.49 7.41 29.46 30.9 30.2 33.55 5.1 18.3 1 44.89-20.13 57-15.85 9.13-36.08 7.11-50.32-3.35-18.3-13.37-21.42-36.89-16.82-53.65.73-2.63 7.66-26.14 30.2-33.55a43.93 43.93 0 0126.87 0zm-33.54 30.2c-3.15 10-7 22.4 0 33.55 4.94 7.82 15.28 15 26.84 13.41 13.84-1.92 22.06-15.47 23.48-26.83 2.16-17.28-11.52-28.67-13.42-30.2-1.39-1.11-15.85-12.44-26.84-6.71-5.73 2.99-7.66 9.13-10.06 16.78z"
        transform="translate(-542.28 -268.31)"
      />
      <path
        id="bdd63596-018d-47fb-9024-04e0c6d62dc4"
        data-name="capital L"
        className="a5f37177-7baa-4704-b6ee-2b1c569dfe8e"
        d="M594.85 302.56c-6.71 10.07-30.19 147.61-16.77 157.68C608.76 483.25 672 483.72 672 477s7.19-14.37 3.36-20.13c-6.71-10.06-64.72 18.18-77.17-6.71-3.35-6.71 2.15-65.63 6.71-83.87 6.71-26.84 20.13-63.74 16.78-67.09-4.57-4.57-24.2-.59-26.83 3.36z"
        transform="translate(-542.28 -268.31)"
      />
    </motion.svg>
  );
}

export default SvgLolaLogo;
