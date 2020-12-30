import React from 'react';
import { PageTitle } from '../PageTitle';
import { PageBorder } from '../PageBorder';
import styled from 'styled-components/macro';
import { colors, devOutline } from '../../../contexts/styling/LolaTheme';
import { ImportantMessage } from '../ImportantMessage';
import { useCurrentDimensions, minVisible } from '../../../utils/sizingUtils';

const Reserved = styled.div`
  border: ${devOutline} solid ${colors.lolaRed};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 30vh;
`;

export default function Devices({
  children,
  title,
  subtitle,
  explanation,
  w, //allows for quick narrowing of overall screen region
  padb, //distance from bottom of window, changes for screens with one button vs two
}) {
  let collapseHeight = 0.68; //percentage of screen visible before collapsing with conditional rendering
  let screen = useCurrentDimensions(); //calls a listener that returns the screen height and width
  let safeRatio = screen.width / screen.height < minVisible(collapseHeight);

  return (
    <>
      <PageBorder padb={padb} w={w}>
        <PageTitle>{title}</PageTitle>
        {safeRatio && <ImportantMessage>{subtitle}</ImportantMessage>}
        {explanation}
        <Reserved>{children}</Reserved>
      </PageBorder>
    </>
  );
}
