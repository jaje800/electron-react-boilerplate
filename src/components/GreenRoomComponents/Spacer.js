import styled from 'styled-components/macro';
import { devOutline } from '../../contexts/styling/LolaTheme';

/*-------------------------------------------------------------------------
Spacer Component
Helps control variable spacing on screens
Will default to 12px unless a prop is given
height (h) is destructured for better legibility
  //height: ${(props) => (props.h ? props.h : "12px")};
  changing to em
-------------------------------------------------------------------------*/

export const Spacer = styled.span`
  height: ${({ h }) => (h ? h : '1em')};
  border: ${devOutline} solid khaki;
`;
