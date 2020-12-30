import styled from 'styled-components/macro';
import {
  devOutline,
  fontSizes,
  textColor,
} from '../../contexts/styling/LolaTheme';
import { MIN_ITEM_DIST } from '../GreenRoomComponents/PageBorder';

/*-------------------------------------------------------------------------
Styled StickyHeader Component
Logos and other items can be wrapped in this and declared first,
*followed by a WorkingSpace component*
to keep them stuck to the top of the container
-------------------------------------------------------------------------*/

export const PageTitle = styled.div`
  font-size: ${fontSizes.hr2};
  border: ${devOutline}dashed gold;
  color: ${textColor};
  padding-bottom: ${MIN_ITEM_DIST};
`;
