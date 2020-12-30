import React from 'react';
import { useStyledTheme } from '../../../utils/themeUtils';
import { colors } from '../../../contexts/styling/LolaTheme';

function SvgEthernetIcon({ w, h }) {
  let curtheme = useStyledTheme();
  let imgcolor;
  if (curtheme.mode === 'dark') {
    imgcolor = `${colors.lolaWhiteBright}`;
  } else {
    imgcolor = `${colors.lolaBlack}`;
  }

  return (
    <svg
      fill={imgcolor}
      stroke={imgcolor}
      width={w ? w : '100%'}
      height={h ? h : '100%'}
      viewBox="0 0 120 91"
    >
      <defs>
        <style>
          {
            '.a,.b{fill:none;stroke-miterlimit:10;stroke-width:5px}.a{stroke-linecap:square}.b{stroke-linecap:round}'
          }
        </style>
      </defs>
      <path className="a" d="M2.5 45.5h115" />
      <path
        className="b"
        d="M44.5 2.5h33v24h-33zM12.5 64.5h32v24h-32zM78.5 64.5h32v24h-32z"
      />
      <path className="a" d="M61.5 29.5v11M94.5 47.5v12M28.5 47.5v12" />
    </svg>
  );
}

export default SvgEthernetIcon;
