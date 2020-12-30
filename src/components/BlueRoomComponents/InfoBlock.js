import styled from 'styled-components';

/*---------------------------------------------------------------------------------
The InfoHeader spans the full width of the page, is sticky, organizes
InfoBlocks in a row.
----------------------------------------------------------------------*/
export const InfoBlock = styled.div`
  border-right: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.5em;
`;
