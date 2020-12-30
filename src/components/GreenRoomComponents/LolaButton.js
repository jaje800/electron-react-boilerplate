import React from 'react';
import styled from 'styled-components/macro';
import { fontSizes, btnWidths } from '../../contexts/styling/LolaTheme';
import { motion } from 'framer-motion';

/*-------------------------------------------------------------------------
Styled LolaButton Component
handles main, try, form, or go variations (diff widths, go has more padding)

currently put in a width (w) override which will be used if none of the above variations
is declared

GlobalStyles has the default settings for buttons in Lola
-------------------------------------------------------------------------*/
const BasicButton = styled(motion.button)`
  /* margin-bottom: ${({ btnstyle }) =>
    btnstyle === 'go' ? '0px' : '.5rem'}; */
  min-width: ${(props) => {
    let width;
    if (props.btnstyle === 'go') {
      width = btnWidths.go;
    } else if (props.btnstyle === 'try') {
      width = btnWidths.try;
    } else if (props.btnstyle === 'main') {
      width = btnWidths.main;
    } else if (props.btnstyle === 'form') {
      width = btnWidths.form;
    } else width = props.w;
    return width;
  }};
  padding: ${({ btnstyle }) =>
    btnstyle === 'go' ? '.25em .5em' : '.5px .5em .5px .5em'};
  font-size: ${({ btnstyle }) =>
    btnstyle === 'go' ? `${fontSizes.gobutton}` : `${fontSizes.button}`};
  &:disabled {
    background: grey;
    pointer-events: painted;
  }
`;

export function LolaButton(props) {
  return <BasicButton {...props}>{props.txt}</BasicButton>;
}
