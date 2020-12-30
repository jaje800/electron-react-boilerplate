import { useEffect, useState } from 'react';
import { designWidth, designHeight } from '../contexts/styling/LolaTheme';

/*********************************************************************************
 Given the size in pts based on Robin's designs at 1000 x 600, pxBase returns the
 base size needed to calculate correct size adjustments during resizing.

 Example:
 Robin's text size is 20pt at a window size of 1000 x 600
 Taking into acct the 2vw size change when the window widens or narrows,
 the base size of the font would be 20pt less the adj value of 2vw
 pxBase determines that 20pt text would have to have a baseSize of 18.

 This way we can adjust the speed of the growth globally as well as the design width
 without having to reassign the different font sizes manually.

 LolaTheme handles updates to font sizes per Robin's design, and the pxBase calculates
 the base value needed for that font size and retuns a text string that can be used
 in calc expressions to control auto resizing

 copy and paste as needed to chqnge:
 the verticalStep determines how quickly the item changes on resize.
 let verticalStep = .01;  //1vw we can adjust the step to speed or slow the growth
 let verticalStep = .05;  //5vw we can adjust the step to speed or slow the growth
 let verticalStep = 0.005; //.5vw we can adjust the step to speed or slow the growth
 ********************************************************************************/

let verticalStep = 0.02; //2vw we can adjust the step to speed or slow the growth on window size change
export const vwVal = `${verticalStep * 100}vw`;

export const pxBase = (size) => {
  let baseSize = size - verticalStep * designWidth;
  return `${baseSize}px`;
};

/*********************************************************************************
 Custom hook returns current screen height and width
 *********************************************************************************/

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

export function useCurrentDimensions() {
  let [dimension, setDimension] = useState({
    width: getWidth(),
    height: getHeight(),
  });

  useEffect(() => {
    const resizeListener = () => {
      setDimension({
        width: getWidth(),
        height: getHeight(),
      });
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  return dimension;
}

/*********************************************************************************
 for use in safeRatio calculations that will used in conditional rendering to
 collapse elements on vertical resizing
 *********************************************************************************/
export const minVisible = (heightCutoff) => {
  return designWidth / (heightCutoff * designHeight);
};
