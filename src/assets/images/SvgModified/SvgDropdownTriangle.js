import React from 'react';
import { motion } from 'framer-motion';

function SvgDropdownTriangle({ open, w, h }) {
  let degrees = 0;
  let start = 0;
  if (open) {
    degrees = 90;
  } else if (!open) {
    degrees = 0;
  }
  return (
    <motion.svg
      style={{ originX: '50%', originY: '50%' }} //triangle will rotate around center
      width={w ? w : '100%'}
      height={h ? h : '100%'}
      viewBox="0 0 17 20"
      initial={{ rotate: start }}
      animate={{ rotate: degrees }}
      transition={{ ease: 'easeIn', duration: 0.05 }}
      // onClick={(e) => {
      //   e.stopPropagation();
      // }}
    >
      <g data-name="Polygon 7" fill="#55bbc1">
        <path d="M.5 19.126V.874L16.014 10 .5 19.126z" />
        <path
          d="M15.028 10L1 1.748v16.504L15.028 10M17 10L0 20V0l17 10z"
          fill="#707070"
          onClick={() => {}}
        />
      </g>
    </motion.svg>
  );
}

export default SvgDropdownTriangle;
