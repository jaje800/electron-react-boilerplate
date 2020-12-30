import styled from 'styled-components/macro';
import { devOutline } from '../../contexts/styling/LolaTheme';

export const DeviceFormSaveSetup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 55vw;
  border: ${devOutline} solid firebrick;
`;
