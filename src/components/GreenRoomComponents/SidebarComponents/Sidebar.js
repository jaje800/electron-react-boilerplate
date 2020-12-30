import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import {
  colors,
  devOutline,
  fontSizes,
  navBackgroundColor,
  sideBarWidth,
  sideBarWidthMIN,
  textColorSidebar,
} from '../../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Styled Sidebar Component
-------------------------------------------------------------------------*/
const SidebarContainer = styled.div`
  height: 100%;
  width: ${sideBarWidth}vw;
  min-width: ${sideBarWidthMIN}px;
  background: ${navBackgroundColor};
  border-right: 1px solid ${navBackgroundColor};
  user-select: none;
  font-size: ${fontSizes.txt};
  color: ${textColorSidebar};
`;

const StatusAreaContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: ${devOutline} solid ${colors.lolaBlue};
`;

export function Sidebar({ children }) {
  return (
    <SidebarContainer>
      <StatusAreaContainer>{children}</StatusAreaContainer>
    </SidebarContainer>
  );
}
