import styled from 'styled-components/macro';
import { fontSizes, devOutline } from '../../contexts/styling/LolaTheme';
import { MIN_ITEM_DIST } from '../GreenRoomComponents/PageBorder';

/*-------------------------------------------------------------------------
The important part of ImportantMessage had been the color change in dark
dark mode, which is no longer needed
-------------------------------------------------------------------------*/

export const ImportantMessage = styled.p`
  font-size: ${fontSizes.hr4};
  line-height: 1.3em;
  cursor: default;
  padding: 0 2.4em ${MIN_ITEM_DIST};
  border: ${devOutline} dashed yellow;
`;
