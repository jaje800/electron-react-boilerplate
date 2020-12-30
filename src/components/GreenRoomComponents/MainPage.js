import styled from 'styled-components/macro';
import { colors, devOutline } from '../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Styled MainPage Component
  styles for page areas throughout Lola
  Main app window can grow, but not shrink
  Page defaults are defined in public/electron.js
-------------------------------------------------------------------------*/

export const MainPage = styled.div`
  height: 100vh;
  /*
  min-width: 800;
  min-height: 500;
  */
  flex-direction: column;
  display: flex;
  border: ${devOutline} dashed ${colors.lolaTeal};
`;
