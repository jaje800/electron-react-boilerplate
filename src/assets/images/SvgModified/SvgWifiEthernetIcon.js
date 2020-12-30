import React from 'react';
import { useStyledTheme } from '../../../utils/themeUtils';
import { colors } from '../../../contexts/styling/LolaTheme';

function SvgWifiEthernetIcon({ w, h }) {
  let curtheme = useStyledTheme();
  let imgcolor;
  if (curtheme.mode === 'dark') {
    imgcolor = `${colors.lolaWhiteBright}`;
  } else {
    imgcolor = `${colors.lolaBlack}`;
  }

  return (
    <svg
      id="wifi_and_ethernet"
      data-name="wifi and ethernet"
      viewBox="0 0 209.74 91"
      width={w ? w : '100%'}
      height={h ? h : '100%'}
    >
      <defs>
        <style>
          {
            '.cls-1,.cls-2,.cls-3{fill:none}.cls-1{stroke-linecap:square;stroke-miterlimit:10;stroke-width:5px}.cls-2,.cls-3{stroke-linecap:round;stroke-miterlimit:10;stroke-width:5px}'
          }
        </style>
      </defs>
      <g
        id="combined_wifi_ether"
        data-name="combined wifi ether"
        fill={imgcolor}
        stroke={imgcolor}
      >
        <g id="ethernet_symbol" data-name="ethernet symbol">
          <path
            id="Line_1"
            data-name="Line 1"
            className="cls-1"
            d="M92.24 45.5h115"
          />
          <path
            id="Rectangle_263"
            data-name="Rectangle 263"
            className="cls-2"
            d="M134.24 2.5h33v24h-33z"
          />
          <path
            id="Rectangle_264"
            data-name="Rectangle 264"
            className="cls-2"
            d="M102.24 64.5h32v24h-32z"
          />
          <path
            id="Rectangle_265"
            data-name="Rectangle 265"
            className="cls-2"
            d="M168.24 64.5h32v24h-32z"
          />
          <path
            id="Line_2"
            data-name="Line 2"
            className="cls-1"
            d="M151.24 29.5v11"
          />
          <path
            id="Line_3"
            data-name="Line 3"
            className="cls-1"
            d="M184.24 47.5v12"
          />
          <path
            id="Line_4"
            data-name="Line 4"
            className="cls-1"
            d="M118.24 47.5v12"
          />
        </g>
        <g id="wifi_icon" data-name="wifi icon" fill="">
          <path
            id="Path_516"
            data-name="Path 516"
            className="cls-3"
            d="M3.75 33.38c.49-.47 12.17-11.57 32.34-11 17.19.52 26.52 8.93 27.6 9.94"
            transform="translate(-1.25)"
          />
          <path
            id="Path_517"
            data-name="Path 517"
            className="cls-3"
            d="M9.79 43.77c.4-.37 10-9.08 26.41-8.61 14 .39 21.64 7 22.53 7.78"
            transform="translate(-1.25)"
          />
          <path
            id="Path_518"
            data-name="Path 518"
            className="cls-3"
            d="M14.6 54.8c.33-.33 8-7.94 21.35-7.51 11.36.37 17.52 6.14 18.24 6.83"
            transform="translate(-1.25)"
          />
          <path
            id="Path_519"
            data-name="Path 519"
            className="cls-3"
            d="M21.77 65a19.68 19.68 0 0114.03-5c7.46.24 11.51 4 12 4.48"
            transform="translate(-1.25)"
          />
          <circle
            id="Ellipse_1"
            data-name="Ellipse 1"
            cx={33.4}
            cy={72.45}
            r={5.24}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgWifiEthernetIcon;
