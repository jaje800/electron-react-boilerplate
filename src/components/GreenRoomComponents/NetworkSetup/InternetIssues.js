import React, { useContext } from 'react';
import { LolaButton } from '../../GreenRoomComponents/LolaButton';
import {
  PageBorder,
  SINGLE_BTN_PADB,
  MIN_ITEM_DIST,
} from '../../GreenRoomComponents/PageBorder';
import { NetworkTxt } from '../../../assets/LolaText';
import styled from 'styled-components/macro';
import { colors, fontSizes } from '../../../contexts/styling/LolaTheme';
import { ImportantMessage } from '../../GreenRoomComponents/ImportantMessage';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';
import { useCurrentDimensions, minVisible } from '../../../utils/sizingUtils';
import { PageTitle } from '../PageTitle';

const WarningContainer = styled.div`
  height: 19.5vw;
  width: 25.3vw;
  border: 2px solid ${colors.lolaRed};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: ${fontSizes.txt};
  margin-bottom: ${MIN_ITEM_DIST};
  padding: 0.25em;
`;

const Graphics = styled.div`
  height: ${({ h }) => (h ? h : '80%')};
  padding .5em;
  //height: 65%;
  display: flex;
  flex-direction: row;
`;

export function InternetIssues({
  children,
  title,
  subtitle,
  notification,
  is_wifi,
}) {
  const { setShownNetwork, setWarnedWifi } = useContext(GreenRoomContext);
  let collapseHeight = 0.75; //percentage of screen visible before collapsing with conditional rendering
  let screen = useCurrentDimensions(); //calls a listener that returns the screen height and width
  let safeRatio = screen.width / screen.height < minVisible(collapseHeight);

  return (
    <>
      <PageBorder padb={SINGLE_BTN_PADB} w="74vw">
        <PageTitle>{title}</PageTitle>
        {safeRatio && (
          <WarningContainer>
            <Graphics>{children}</Graphics>
            {subtitle}
          </WarningContainer>
        )}
        <ImportantMessage>{notification}</ImportantMessage>

        <LolaButton
          btnstyle="main"
          id="BBSBtn"
          txt={NetworkTxt.NWcontinueAnywayBtn}
          onClick={() => {
            setShownNetwork(true);
            if (is_wifi) setWarnedWifi(true);
          }}
        />
      </PageBorder>
    </>
  );
}
