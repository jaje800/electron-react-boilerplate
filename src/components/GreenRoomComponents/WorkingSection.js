import styled from 'styled-components/macro';
import {
  colors,
  backgroundColor,
  textColor,
  devOutline,
} from '../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Styled WorkingSection Component
The section of the screen containing the nav bar and the WorkingContainer
-------------------------------------------------------------------------*/
export const WorkingSection = styled.div`
  background-color: ${backgroundColor};
  height: 100%;
  width: 100vw;
  color: ${textColor};
  flex-direction: row;
  display: flex;
  text-align: center;
  border: ${devOutline} solid ${colors.lolaRed};
`;
