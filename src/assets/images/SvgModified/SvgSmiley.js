import React from 'react';
import { colors } from '../../../contexts/styling/LolaTheme';
import { motion } from 'framer-motion';

function SvgSmiley({ w, h, blink }) {
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
          stroke="#000"
          strokeMiterlimit={10}
        />
      ) : (
        <motion.circle
          data-name="right eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          transform="translate(16.666 8.113)"
          stroke="#000"
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
          stroke="#000"
          strokeMiterlimit={10}
        />
      ) : (
        <motion.circle
          data-name="left eye"
          cx={1.499}
          cy={1.499}
          r={1.499}
          transform="translate(4.896 8.113)"
          stroke="#000"
          strokeMiterlimit={10}
        />
      )}
      <path
        d="M5.597 15.42a11.406 11.406 0 003.864 3.307 7.156 7.156 0 004.941 1.037c3.221-.715 4.867-4.208 5.116-4.762"
        fill="#F5C115"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

export default SvgSmiley;
