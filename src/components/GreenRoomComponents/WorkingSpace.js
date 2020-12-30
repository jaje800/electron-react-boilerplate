import styled from 'styled-components/macro';
import { WorkingContainer } from './WorkingContainer';

/*-------------------------------------------------------------------------
Styled WorkingSpace Component
Extends WorkingContainer to allow for even spacing between components
when the window size is altered
-------------------------------------------------------------------------*/

export const WorkingSpace = styled(WorkingContainer)`
  justify-content: space-evenly;
`;
