import styled from 'styled-components/macro';
import { MIN_ITEM_DIST } from './PageBorder';

// this allows narrower grouping of text, but can handle multiple <p>
// defined within to control line breaks
// it also accepts a l/r padding prop to better match Robin's text flow designs
export const SubInstruction = styled.div`
  padding: 0 ${({ lrpad }) => (lrpad ? lrpad : '2.75')} ${MIN_ITEM_DIST};
`;
