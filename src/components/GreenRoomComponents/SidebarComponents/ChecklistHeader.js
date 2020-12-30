import React from 'react';
import styled from 'styled-components/macro';
import SvgLolaLogo from '../../../assets/images/SvgModified/SvgLolaLogo';
import SvgBBRchecklistHdr from '../../../assets/images/SvgModified/SvgBBRchecklistHdr';
import { colors } from '../../../contexts/styling/LolaTheme';

const HeaderBlock = styled.div`
  padding: 0.5em;
  position: sticky;
  display: flex;
  flex-direction: row;
  height: auto;
  width: auto;
  justify-content: space-between;
  background: ${colors.lolaBlueNight};
  border-bottom: 1px solid ${colors.lolaBlackSoft};
  align-items: baseline;
`;

export default function ChecklistHeader() {
  return (
    <HeaderBlock>
      <SvgLolaLogo w="23vw" jamwerks="true" quiet="false" sidebar="true" />
      <SvgBBRchecklistHdr w="30vw" />
    </HeaderBlock>
  );
}
