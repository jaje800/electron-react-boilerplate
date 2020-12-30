import React from 'react';
import styled from 'styled-components';
import {
  colors,
  fontSizes,
  textColor,
  devOutline,
} from '../../contexts/styling/LolaTheme';

/*---------------------------------------------------------------------------------
The join and start info blocks have mixed-sized text that aligns along the baseline
---------------------------------------------------------------------------------*/
const AlignedGroup = styled.div`
  display: flex;
  flex-direction: row;
  cursor: default;
  align-items: baseline;
  padding-bottom: 0em;
  border: ${devOutline} dashed bisque;
`;

/*---------------------------------------------------------------------------------
The join and start blue titles have their own font sizes. Line heights for this
and the trailing text are nmatched to allow the aligned group to snap to the base
---------------------------------------------------------------------------------*/
const BlueTitle = styled.div`
  padding-right: 0.1em;
  //line-height: 1em;
  font-size: 30px;
  //  font-size: ${fontSizes.blueTitle};
  color: ${colors.lolaBlueDim};
  border: ${devOutline} solid gold;
`;

/*---------------------------------------------------------------------------------
This text trails the blue title text and shares its baseline
---------------------------------------------------------------------------------*/
const SmallerText = styled.div`
  //padding-right: 0.2em;
  //line-height: 1em;
  font-size: 15px;
  //  font-size: ${fontSizes.mini};
  color: ${textColor};
  border: ${devOutline} solid palegreen;
`;

/*---------------------------------------------------------------------------------
the join and start blocks follow the same pattern of title and test base aligned
---------------------------------------------------------------------------------*/
export function BaseAligned(props) {
  return (
    <AlignedGroup>
      <BlueTitle>{props.bigTxt}</BlueTitle>
      <SmallerText>{props.lilTxt}</SmallerText>
    </AlignedGroup>
  );
}
