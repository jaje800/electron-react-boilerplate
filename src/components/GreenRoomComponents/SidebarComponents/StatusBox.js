import React from 'react';
import styled from 'styled-components/macro';
import {
  colors,
  devOutline,
  fontSizes,
} from '../../../contexts/styling/LolaTheme';
import SvgCheckbox from '../../../assets/images/SvgModified/SvgCheckbox';

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.25em;
  border: ${devOutline} solid deeppink;
`;

const BoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 3px;
  font-size: ${fontSizes.hr4};
  color: ${colors.lolaYellow};
`;

export default function StatusBox({ children, title, result, flagged }) {
  return (
    <InfoBlock>
      <BoxHeader>
        {title}
        <SvgCheckbox result={result} flagged={flagged} w="2.5vw" />
      </BoxHeader>
      {children}
    </InfoBlock>
  );
}
