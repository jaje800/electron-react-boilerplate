import React from 'react';
import { colors } from '../../../contexts/styling/LolaTheme';
import { motion } from 'framer-motion';

let eyeColor = `${colors.lolaBlack}`;

function SvgNeutral({ w, h, blink }) {
  return (
    <svg width={w ? w : '1em'} height={h ? h : '1em'} viewBox="0 0 25 25">
      <circle cx={12.5} cy={12.5} r={12.5} fill={colors.lolaYellow} />
      {blink ? (
        <motion.circle
          data-name="right eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          initial={{ x: 16.666, y: 8.113, opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ yoyo: 1, duration: 0.3 }}
          transform="translate(16.666 8.113)"
          stroke={eyeColor}
          //stroke="#000"
          strokeMiterlimit={10}
        />
      ) : (
        <motion.circle
          data-name="right eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          transform="translate(16.666 8.113)"
          stroke={eyeColor}
          //stroke="#000"
          strokeMiterlimit={10}
        />
      )}
      )}
      {blink ? (
        <motion.circle
          data-name="left eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          transform="translate(4.896 8.113)"
          initial={{ x: 4.896, y: 8.113, opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ yoyo: 1, duration: 0.3 }}
          stroke={eyeColor}
          // stroke="#000"
          strokeMiterlimit={10}
        />
      ) : (
        <motion.circle
          data-name="left eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          transform="translate(4.896 8.113)"
          stroke={eyeColor}
          // stroke="#000"
          strokeMiterlimit={10}
        />
      )}
      <path
        data-name="Path 621"
        d="M6.863 16.884h11.323"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={1.75}
      />
    </svg>
  );
}

export default SvgNeutral;
