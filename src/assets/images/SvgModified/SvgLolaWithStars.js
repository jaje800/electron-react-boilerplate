import React from 'react';
import { useStyledTheme } from '../../../utils/themeUtils';
import { colors } from '../../../contexts/styling/LolaTheme';
import { motion } from 'framer-motion';

function SvgLolaWithStars({ w, h }) {
  let curtheme = useStyledTheme();
  let textcolor;

  if (curtheme.mode === 'dark') {
    textcolor = `${colors.lolaWhiteBright}`;
  } else {
    textcolor = `${colors.lolaBlack}`;
  }

  return (
    <motion.svg
      id="bb17919d-fea4-4bbc-ba5f-e8f65bc666b9"
      data-name="lola surrounded by stars"
      viewBox="0 0 479.67 341.39"
      width={w ? w : '100%'}
      height={h ? h : '100%'}
    >
      <defs>
        <style>
          {
            '.a61c99d9-17cc-471e-bb3e-ab43dbd4df96{fill:#549ed6}.b27b4c2c-8fc2-4fed-93b5-2fef4188329e{fill:#da1e3a}.a32f7bc3-532d-4dea-8be2-5b959cc7c8f2{fill:#55bbc1}.f312fe8b-883e-41f2-aaca-3a1092b8d1dd{fill:#f5c115}'
          }
        </style>
      </defs>
      <g
        id="acf1271c-4408-44fa-b562-371fc9195cef"
        data-name="lola powered by jamwerks"
        fill={textcolor}
      >
        <g id="fe83c8df-2e48-4936-94df-7ddcc0484326" data-name="jamwerks">
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, delay: 4 }}
            d="M234.23 331.91c0 6.4-2 9.48-8.81 9.48v-4.56c3.88 0 3.88-2.83 3.88-6.16v-31.76h4.93zm-5.23-44.7h5.42v5.54H229zM249.19 311.9h4.86v-3.57c0-4.25-1.23-5.36-4.74-5.36-3 0-4.13.43-5.36 2.95l-3.75-2.4c1.72-3.57 4.31-5.11 9.17-5.11 6.34 0 9.6 2.53 9.6 9.92v21.36h-4.92v-3c-.92 2.1-2.28 3.51-5.73 3.51-5.66 0-8.74-3.51-8.74-9.48 0-6.67 4-8.82 9.61-8.82zm4.86 4.18h-4.56c-3.63 0-5 1.67-5 4.74 0 3.45 1.78 4.81 4.61 4.81 2.65 0 4.93-.87 4.93-7.76zM265.38 298.91h4.92v3a6.35 6.35 0 015.91-3.51 7.29 7.29 0 017.21 4.87c1.6-3.39 4.06-4.87 7.2-4.87 5 0 8.62 4.07 8.62 12.07v19.21h-4.93v-19.14c0-6-2.15-7.57-4.74-7.57-2.77 0-4.8 2.34-4.8 7.51v19.21h-4.93v-19.15c0-6-2.15-7.57-4.74-7.57-2.83 0-4.8 2.58-4.8 7.51v19.21h-4.92zM314.44 329.69h-4.12l-7.39-30.78h5.29l4.38 21.61 5.54-21.61h4.68l5.6 21.79 4.31-21.79H338l-7.26 30.78h-4.19l-6-22.6zM359.88 325.07c-1.66 3.63-4.44 5.11-8.81 5.11-7.08 0-10.65-5.35-10.65-13.91v-4.07c0-8.74 3.51-13.79 9.85-13.79 6.71 0 9.92 4.25 9.92 13.79v3.21h-14.84v.86c0 5.29 1.47 9.48 5.66 9.48 3 0 4-1.17 5.24-3.2zm-14.53-14h9.91c0-6.41-1.48-8.25-5-8.25-3.74.03-4.91 2.8-4.91 8.28zM379.27 305.49c-1-1.78-2.16-2.52-3.82-2.52-2.77 0-4.55 2.34-4.55 7.45v19.27H366v-30.78h4.93v3a5.91 5.91 0 015.6-3.51c2.89 0 5.05 1.42 6.59 4.19zM405.13 298.91l-8.93 12.55 10.34 18.23h-5.78l-7.76-14-2.28 3.14v10.84h-4.93v-42.46h4.93v24.07l8.74-12.37zM423.53 306.11c-1.23-2.16-2.34-3.14-5.35-3.14-2.65 0-4.19 1.41-4.19 4.12 0 2.9 1.6 4.13 4.93 4.87 4.43 1 8.92 2.83 8.92 9.17 0 5.36-3.14 9.05-9.42 9.05-5.05 0-7.75-1.78-9.66-5l3.51-2.84c1.23 2.22 2.83 3.27 5.85 3.27 3.2 0 4.8-1.6 4.8-4.37s-1.11-3.95-5.48-4.93c-4.13-.92-8.38-3.2-8.38-9.17 0-5.11 3.33-8.75 8.93-8.75 4.07 0 7.14 1.3 9.11 5.11z"
          />
        </g>
        <g id="b4478a9c-b607-4a19-8428-cf0039ab9522" data-name="powered by">
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, delay: 4 }}
            d="M251.38 266.89c3.55 0 5.47 2.61 5.47 7.75v3c0 5.22-1.88 7.83-5.47 7.83-2.28 0-3.7-.87-4.49-2.86v9.53h-1.09v-25h1.09v2.64c.79-2.06 2.21-2.89 4.49-2.89zm4.39 10.72v-3c0-4.45-1.45-6.67-4.39-6.67-3.44 0-4.49 2.61-4.49 6.42v3.26c0 4 .9 6.71 4.49 6.71 2.97.03 4.39-2.19 4.39-6.72zM271.06 277.69c0 5.14-2.07 7.75-5.66 7.75s-5.65-2.61-5.65-7.75v-3.05c0-5.14 2.07-7.75 5.65-7.75s5.66 2.61 5.66 7.75zm-1.09 0v-3.05c0-4.49-1.59-6.67-4.57-6.67s-4.56 2.18-4.56 6.67v3.05c0 4.49 1.59 6.67 4.56 6.67s4.6-2.18 4.6-6.67zM277.91 285.22h-1.09l-4-18.11h1.12l3.52 16.16 4.31-16.16h1.09l4.27 16.16 3.55-16.16h1.13l-4.06 18.11h-1.09l-4.35-16.12zM304.14 282.58a5.18 5.18 0 01-4.74 2.86c-3.74 0-5.88-2.82-5.88-7.83v-3c0-5.14 2-7.75 5.37-7.75s5.36 2.61 5.36 7.75v1.81h-9.64v1.16c0 4 1.42 6.75 4.75 6.75a4.14 4.14 0 003.91-2.4zm-9.53-7.21h8.55c0-5-1.3-7.4-4.27-7.4s-4.28 2.43-4.28 7.4zM316 270.11a3.69 3.69 0 00-3.19-2.14c-2.5 0-3.66 2.83-3.66 6.71v10.54H308v-18.11h1.09v2.82c.65-1.81 1.92-3 3.77-3a4.56 4.56 0 013.95 2.53zM328.68 282.58a5.19 5.19 0 01-4.75 2.86c-3.73 0-5.87-2.82-5.87-7.83v-3c0-5.14 1.95-7.75 5.36-7.75s5.37 2.61 5.37 7.75v1.81h-9.64v1.16c0 4 1.41 6.75 4.74 6.75a4.16 4.16 0 003.92-2.4zm-9.53-7.21h8.55c0-5-1.31-7.4-4.28-7.4s-4.27 2.43-4.27 7.4zM341.79 260.22h1.09v25h-1.09v-2.64c-.79 2-2.21 2.86-4.49 2.86-3.59 0-5.47-2.61-5.47-7.83v-3c0-5.14 1.92-7.75 5.47-7.75 2.28 0 3.7.83 4.49 2.86zm0 17.43v-3.26c0-3.81-1.05-6.42-4.49-6.42-2.93 0-4.38 2.22-4.38 6.67v3c0 4.53 1.41 6.75 4.38 6.75 3.59-.03 4.49-2.75 4.49-6.74zM360.06 266.89c3.55 0 5.47 2.61 5.47 7.75v3c0 5.22-1.88 7.83-5.47 7.83-2.28 0-3.7-.87-4.49-2.86v2.64h-1.09v-25h1.09v9.53c.79-2.06 2.21-2.89 4.49-2.89zm4.38 10.72v-3c0-4.45-1.45-6.67-4.38-6.67-3.44 0-4.49 2.61-4.49 6.42v3.26c0 4 .9 6.71 4.49 6.71 2.94.03 4.38-2.19 4.38-6.72zM373.14 285.62l-6-18.51h1.16c1.38 4.34 2.76 8.58 5.33 16.74l4.57-16.74h1.12l-5.22 18.95c-1.12 4.35-2.17 6.05-5.15 6.05V291c2.47 0 3-1.41 4.1-5.14z"
          />
        </g>
        <g id="f41b4df7-fdc3-4233-a35c-eee0e738725f" data-name="lola alone">
          <motion.rect
            initial={{ opacity: 1, x: 0, y: 0, rotate: -135 }}
            animate={{ opacity: 0 }}
            transition={{ yoyo: 2, duration: 0.5, delay: 2 }}
            id="b15fd9c8-78bb-4e87-8c91-8ea468acdae9"
            data-name="blue dot 1"
            className="a61c99d9-17cc-471e-bb3e-ab43dbd4df96"
            x={213.07}
            y={93.66}
            width={19.14}
            height={20.15}
            rx={4.42}
            transform="rotate(-135 222.646 103.734)"
          />
          <motion.rect
            initial={{ opacity: 1, x: 0, y: 0, rotate: -40.58 }}
            animate={{ opacity: 0 }}
            transition={{ yoyo: 4, duration: 1 }}
            id="a9baef34-cbfe-470a-accb-1e61898b83a5"
            data-name="red dot 1"
            className="b27b4c2c-8fc2-4fed-93b5-2fef4188329e"
            x={71.56}
            y={195.9}
            width={19.71}
            height={14.83}
            rx={6.24}
            transform="rotate(-40.58 81.416 203.319)"
          />
          <motion.rect
            initial={{ opacity: 1, x: 0, y: 0, rotate: -13.58 }}
            animate={{ opacity: 0 }}
            transition={{ yoyo: 2, duration: 1.25, delay: 0.75 }}
            id="ec277f82-9f49-4e68-be31-688f99f77d4d"
            data-name="teal dot 1"
            className="a32f7bc3-532d-4dea-8be2-5b959cc7c8f2"
            x={378.53}
            y={221.94}
            width={17.24}
            height={14.41}
            rx={6.06}
            transform="rotate(-13.58 387.15 229.143)"
          />
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, delay: 3 }}
            id="ae148eef-a25f-4c90-a496-0ee7e4b9f1e4"
            data-name="a"
            className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
            d="M320.59 153.64c9.05 2.31 14.28 9.56 18.8 15.83 5.17 7.15 8.33 14.75 10.89 24.73 7.68 30.05 4.7 51.92 9.56 53.07 2.64.62-5.11 8.43-6.14 6.49-1.29-2.44-1.84-13.61-17.27-9.09-24.83 7.27-29.93 11.21-35.63 7.91-7-4.06-8.88-15.62-6.92-23.75 2.58-10.7 12-16.14 14.84-17.81 11.14-6.45 17.55-1.93 22.76-7.91 5.75-6.62 3.85-19-1-26.72-1.84-2.94-5.67-9.09-11.87-9.89-10.29-1.33-16.85 13.36-23.75 10.88-3.44-1.23-5.39-6.17-4.95-9.89 1.09-9.23 17.67-17.19 30.68-13.85zM337.66 214c-5.29-1.53-9.89.43-15.83 3-5.59 2.39-9.85 4.21-12.86 8.91s-4.92 12.36-2 14.84 8.47-3.24 26.72-9.9c9-3.26 13.29-3.91 13.85-6.92.7-3.71-4.68-8.43-9.88-9.93z"
          />
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, delay: 3 }}
            id="b928df43-6f8b-4021-bdaa-4fff28df3db7"
            data-name="lower case l"
            className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
            d="M248.36 81.48c-3 12 13.63 63 15.05 98.62 1.4 35.19-16.91 59.38-6 67.68a11.51 11.51 0 0010.53 1.5c7.21-2.69 11.32-14.41 10.53-66.18-.74-48.33-6-102.39-16.67-105-5-1.19-12.28-1.27-13.44 3.38z"
          />
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, delay: 3 }}
            id="e22d5ede-a39f-4185-9889-cb12274e6c85"
            data-name="o"
            className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
            d="M211.46 155.28c22.48 7.41 29.45 30.9 30.19 33.55 5.1 18.3 1 44.89-20.13 57-15.85 9.13-36.08 7.11-50.32-3.35-18.3-13.44-21.42-36.92-16.77-53.68.73-2.63 7.65-26.14 30.19-33.55a44 44 0 0126.84.03zm-33.55 30.2c-3.15 10-7 22.4 0 33.55 4.94 7.82 15.28 15 26.84 13.41 13.84-1.92 22.06-15.47 23.48-26.83 2.16-17.29-11.52-28.67-13.42-30.2C213.42 174.29 199 163 188 168.7c-5.75 2.99-7.69 9.13-10.09 16.78z"
          />
          <motion.path
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, delay: 3 }}
            id="bc4fe4f5-8d79-4da7-8149-f9c534b673f9"
            data-name="capital L"
            className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
            d="M124.23 111.67c-6.71 10.07-30.23 147.61-16.77 157.68 30.68 23 93.93 23.48 93.93 16.77s7.19-14.37 3.36-20.13c-6.71-10.06-64.72 18.18-77.16-6.71-3.36-6.71 2.15-65.63 6.71-83.87 6.71-26.84 20.13-63.74 16.77-67.09-4.58-4.58-24.21-.6-26.84 3.35z"
          />
        </g>
      </g>
      <g id="fe467985-db49-4a65-88e0-6af0257c3e74" data-name="orbiting stars">
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.25 }}
          id="ecd2010c-4a0f-4eff-b3f0-6c043c7f18db"
          data-name="blue star 2"
          className="a61c99d9-17cc-471e-bb3e-ab43dbd4df96"
          x={469.06}
          y={153.79}
          width={9.65}
          height={9.99}
          rx={2.59}
          transform="rotate(-147.07 473.877 158.804)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.5, delay: 1 }}
          id="e74f84a4-6857-4c5a-8b7f-fb3276f8cc07"
          data-name="blue star 1"
          className="a61c99d9-17cc-471e-bb3e-ab43dbd4df96"
          x={0.89}
          y={231.35}
          width={9.65}
          height={9.19}
          rx={2.28}
          transform="rotate(-135 5.717 235.947)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.25, delay: 2 }}
          id="bd9e36ec-99aa-4317-8d73-bb04369e9ff2"
          data-name="teal star 2"
          className="a32f7bc3-532d-4dea-8be2-5b959cc7c8f2"
          x={362.19}
          y={84.83}
          width={10.09}
          height={10.61}
          rx={3.99}
          transform="rotate(-13.58 367.243 90.148)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.5, delay: 3 }}
          id="e0696b46-1158-48f7-b487-b359c349783a"
          data-name="teal star 1"
          className="a32f7bc3-532d-4dea-8be2-5b959cc7c8f2"
          x={11.38}
          y={77.11}
          width={7}
          height={7}
          rx={1.35}
          transform="rotate(180 14.88 80.61)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.25, delay: 0.5 }}
          id="bdc3ab7f-e9f0-42bc-80ac-4c175ebc6c7e"
          data-name="red star 2"
          className="b27b4c2c-8fc2-4fed-93b5-2fef4188329e"
          x={464.76}
          y={307.51}
          width={7.11}
          height={7.12}
          rx={1.73}
          transform="rotate(-20.19 468.324 311.087)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.5, delay: 1.5 }}
          id="ff3ba2d7-3e9c-4b08-9a1b-94f9e7490bd5"
          data-name="red star 1"
          className="b27b4c2c-8fc2-4fed-93b5-2fef4188329e"
          x={251.04}
          y={1.12}
          width={9.19}
          height={8.49}
          rx={2.15}
          transform="rotate(45 255.631 5.356)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.25, delay: 2.5 }}
          id="ba31afed-c566-4c1e-b7f3-7c8a24c43d3a"
          data-name="yellow star 3"
          className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
          x={440.04}
          y={40.12}
          width={9.19}
          height={8.49}
          rx={2.15}
          transform="rotate(45 444.634 44.363)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.5, delay: 0.75 }}
          id="a019e0a7-ae5a-4d7e-b469-d13e20b8b945"
          data-name="yellow star 2"
          className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
          x={127.04}
          y={34.12}
          width={9.19}
          height={8.49}
          rx={2.15}
          transform="rotate(45 131.63 38.363)"
        />
        <motion.rect
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 0.5, rotate: 360 }}
          transition={{ yoyo: Infinity, duration: 0.25, delay: 1.25 }}
          id="b1361dae-6dc9-4801-ac50-60244d9e7a17"
          data-name="yellow star 1"
          className="f312fe8b-883e-41f2-aaca-3a1092b8d1dd"
          x={43.04}
          y={326.12}
          width={9.19}
          height={8.49}
          rx={2.15}
          transform="rotate(45 47.63 330.36)"
        />
      </g>
    </motion.svg>
  );
}

export default SvgLolaWithStars;
