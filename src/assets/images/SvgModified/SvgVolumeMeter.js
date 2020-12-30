import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../../contexts/styling/LolaTheme';

function SvgVolumeMeter({ w, h, deviceId, margin }) {
  const audioLevels = useSelector((state) => state.localAudioLevels);
  let vol =
    audioLevels !== undefined && deviceId in audioLevels.devices //the first condition as a placeholder since audioLevels in undefined for headphones/speakers
      ? audioLevels.devices[deviceId].loudest_level
      : 0;
  vol = vol * 148;
  return (
    <svg
      id="f1c8c5d3-9807-48d1-9045-cb5f3cb12040"
      data-name="sound meter"
      viewBox="0 0 145.51 27"
      width={w ? w : '100%'}
      height={h ? h : '100%'}
      style={{ margin: margin || 0 }}
    >
      <defs>
        <clipPath
          id="b035b302-c0c4-4575-85b6-8b43e253b7b7"
          transform="translate(.25 .5)"
        >
          <rect
            id="fcd66ed9-10ef-4a13-a2f6-1619c45ba34a"
            data-name="box 1 clipping mask"
            width={145}
            height={26}
            rx={3.18}
          />
        </clipPath>
        <style>{'.b3f0e260-c999-4168-9170-97ddb2487b5c{fill:none}'}</style>
      </defs>
      <g
        clipPath="url(#b035b302-c0c4-4575-85b6-8b43e253b7b7)"
        id="b9ec8744-ff22-416b-8666-c8f25b95e73f"
        data-name="box 1 (clipped partial)"
      >
        <path
          id="e5463842-1799-42ec-8713-980b6d3bb582"
          data-name="box 1 clipping mask 2"
          fill="#549ed6"
          d="M.25 0h4v27h-4z"
        />
      </g>
      <rect
        id="ac6e794f-c4fe-4c90-8db0-780a7f75ee4c"
        data-name="container box"
        x={0.25}
        y={0.5}
        width={145}
        height={26}
        rx={3.18}
        stroke="#000001"
        strokeMiterlimit={10}
        strokeWidth={0.51}
        fill="none"
      />
      <rect
        data-name="volume within"
        x={0.25}
        y={0.5}
        width={vol}
        height={26}
        rx={3.18}
        //stroke="#000001"
        strokeMiterlimit={10}
        strokeWidth={0.51}
        fill={colors.lolaBlueVolume}
      />
    </svg>
  );
}

export default SvgVolumeMeter;
