import styled from 'styled-components/macro';
import { devOutline } from '../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Styled StickyHeader Component
Logos and other items can be wrapped in this and declared first,
*followed by a WorkingSpace component*
to keep them stuck to the top of the container
-------------------------------------------------------------------------*/

export const StickyHeader = styled.div`
  position: sticky;
  //justify-content: space-evenly;
  top: 3rem;
  border: ${devOutline} dashed gold;
`;
