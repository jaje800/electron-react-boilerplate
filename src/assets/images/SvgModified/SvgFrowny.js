import React from 'react';
import { colors } from '../../../contexts/styling/LolaTheme';
import { motion } from 'framer-motion';

function SvgFrowny({ w, h, blink }) {
  return (
    <svg width={w ? w : '1em'} height={h ? h : '1em'} viewBox="0 0 25 25">
      <path
        d="M12.5 0A12.5 12.5 0 110 12.5 12.5 12.5 0 0112.5 0z"
        fill={colors.lolaYellow}
      />
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
        d="M6.914 18.842c.3-.49 2.142-3.382 5.091-3.507a6.306 6.306 0 014.242 1.755 10.266 10.266 0 012.44 3.106"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
      />
    </svg>
  );
}

export default SvgFrowny;
