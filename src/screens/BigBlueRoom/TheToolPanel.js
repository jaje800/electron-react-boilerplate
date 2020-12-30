import React from 'react';
import styled from 'styled-components';
import { backgroundColor, colors } from '../../contexts/styling/LolaTheme';
import { BBR_TOOL_PANEL_WIDTH, BBR_TOOL_PANEL_MIN_WIDTH } from './TheHeader';
/*---------------------------------------------------------------------------------
---------------------------------------------------------------------------------*/
const USER_HEIGHT = BBR_TOOL_PANEL_MIN_WIDTH * 2;

const ToolPanelColumn = styled.div`
  height: 100%;
  width: ${BBR_TOOL_PANEL_MIN_WIDTH}px;
  /* width: ${BBR_TOOL_PANEL_WIDTH}vw;
  min-width: ${BBR_TOOL_PANEL_MIN_WIDTH}px; */
  background-color: ${backgroundColor};
  //border: 1px solid ${backgroundColor};
`;

const ToolFrame = styled.div`
  height: ${BBR_TOOL_PANEL_MIN_WIDTH}px;
  width: ${BBR_TOOL_PANEL_MIN_WIDTH}px;
  border-bottom: 1px solid ${colors.lolaGray};
`;

const UserFrame = styled.div`
  height: ${USER_HEIGHT}px;
  width: ${BBR_TOOL_PANEL_MIN_WIDTH}px;
  border-bottom: 1px solid ${colors.lolaGray};
`;

export function TheToolPanel() {
  return (
    <ToolPanelColumn>
      <ToolFrame>internet</ToolFrame>
      <ToolFrame>mic</ToolFrame>
      <ToolFrame>speaker</ToolFrame>
      {/* <ToolFrame>latency</ToolFrame>
      <ToolFrame>jitter </ToolFrame> */}
      <ToolFrame>acct</ToolFrame>
      <UserFrame>user</UserFrame>
    </ToolPanelColumn>
  );
}
