import styled from 'styled-components/macro';
import {
  backgroundColor,
  textColor,
  devOutline,
  workingContainerWidth,
} from '../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Styled WorkingContainer Component
page enter and exit not yet active
Space that changes when screens are switched

This component should only regulate how children within it are spaced.
Items inside default to column view, centered horizontally and vertically.
Variety within the WorkingContainer should be managed at the child level.

Two components here allow a sticky header and a working space that allows
flexed display of evenly spaced components
-------------------------------------------------------------------------*/

export const WorkingContainer = styled.div`
  background-color: ${backgroundColor};
  width: ${workingContainerWidth}vw;
  height: 100%;
  color: ${textColor};
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${devOutline} dashed violet;
`;
