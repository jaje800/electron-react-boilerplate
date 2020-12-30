import React from 'react';
import { useStyledTheme } from '../../../utils/themeUtils';
import { colors } from '../../../contexts/styling/LolaTheme';

function SvgWifiIcon({ w, h }) {
  let curtheme = useStyledTheme();
  let imgcolor;
  if (curtheme.mode === 'dark') {
    imgcolor = `${colors.lolaWhiteBright}`;
  } else {
    imgcolor = `${colors.lolaBlack}`;
  }

  return (
    <svg
      width={w ? w : '100%'}
      height={h ? h : '100%'}
      viewBox="0 0 67.285 59.461"
    >
      <defs>
        <style>
          {
            '.a{fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:5px}'
          }
        </style>
      </defs>
      <g transform="translate(-6.22 -5.853)">
        <path
          stroke={imgcolor}
          className="a"
          d="M9.63 20.102c.5-.465 12.366-11.365 32.513-10.411 17.182.812 26.361 9.383 27.426 10.411M15.49 30.589c.411-.364 10.1-8.91 26.546-8.161 14.03.635 21.523 7.351 22.392 8.161M20.117 41.693c.331-.319 8.167-7.793 21.471-7.139 11.346.559 17.408 6.432 18.111 7.139M27.108 51.974a19.688 19.688 0 0114.11-4.686c7.456.368 11.439 4.221 11.9 4.686"
        />
        <circle
          fill={imgcolor}
          cx={5.243}
          cy={5.243}
          r={5.243}
          transform="translate(34.613 54.441)"
        />
      </g>
    </svg>
  );
}

export default SvgWifiIcon;
