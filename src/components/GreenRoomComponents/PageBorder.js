import styled from 'styled-components/macro';
import { colors, devOutline } from '../../contexts/styling/LolaTheme';

// providing a working area insice the screen space available
// the border color and radius are still listed in case a border
// will become part of the design again (like the warning border)
// L8R convert these values using pxBase so that they can shrink more quickly
// export const SINGLE_BTN_PADB = '15vh'; 71px
export const SINGLE_BTN_PADB = '15vh';
export const DBL_BTN_PADB = '10vh';
export const MIN_ITEM_DIST = '1.5vh';

export const PageBorder = styled.div`
  height: ${({ h }) => (h ? h : 'calc(100% - 1.25em)')};
  width: ${({ w }) => (w ? w : 'calc(100% - 2em)')};
  margin: 0px;
  border: ${devOutline} solid ${colors.lolaTeal};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ padb }) => (padb ? padb : '1em')};
  padding-top: 1em;
  user-select: none;
`;
