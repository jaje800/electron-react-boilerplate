import styled from 'styled-components';
import { devOutline } from '../../contexts/styling/LolaTheme';

/*---------------------------------------------------------------------------------
Header Blocks can be made up of rows
---------------------------------------------------------------------------------*/
export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: ${devOutline} solid skyblue;
`;
