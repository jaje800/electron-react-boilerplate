import React from 'react';
import styled from 'styled-components/macro';
import {
  TheHeader,
  BBR_MIN_HEADER_HEIGHT,
  BBR_TOOL_PANEL_MIN_WIDTH,
} from './TheHeader';
import TheAvatarPanel from './TheAvatarPanel';
import BlueRoom3Space from './BlueRoom3Space';
import { TheToolPanel } from './TheToolPanel';
import SvgLolaLogo from '../../assets/images/SvgModified/SvgLolaLogo';

const EverythingColumn = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  //flex: 1 1 100%; //no longer need these
`;

const SansHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  //flex: 1 100%; //no longer need these
`;
const blueWidth = `calc(100vw - ${BBR_TOOL_PANEL_MIN_WIDTH}px)`;
const blueHeight = `calc(100vh - ${BBR_MIN_HEADER_HEIGHT}px)`;

function TheBlueRoom() {
  return (
    <EverythingColumn>
      <TheHeader />
      <SansHeaderRow>
        <TheToolPanel />
        <BlueRoom3Space width={blueWidth} height={blueHeight} />
        <TheAvatarPanel />
      </SansHeaderRow>
    </EverythingColumn>
  );
}
export default TheBlueRoom;
