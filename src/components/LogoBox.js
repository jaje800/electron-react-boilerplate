import styled from 'styled-components/macro';
import { fontSizes, devOutline } from '../LolaTheme';

/*-------------------------------------------------------------------------
LogoBox contains the Lola svg
Accepts value top as a prop
/*-------------------------------------------------------------------------*/

export const LogoBox = styled.div`
  display: block;
  top: ${({ top }) => top};
  position: sticky; //putting this in for now to remove stickyheader - when I put any other component in SH, it stops sticking
  svg {
    font-size: ${fontSizes.hr5};
    overflow: visible; //allows network scan test to be seen if it ends up outside the logo box beasue of the length of the nmae
    border: ${devOutline} solid forestgreen;
  }
  border: ${devOutline} solid royalblue;
`;
