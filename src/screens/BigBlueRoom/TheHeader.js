import React from 'react';
import styled from 'styled-components';
import { navBackgroundColor } from '../../contexts/styling/LolaTheme';
import { ThemeToggleSwitch } from '../../components/ThemeToggleSwitchComponent';
import { Grid, makeStyles } from '@material-ui/core';
import JoinBlock from '../../components/BlueRoomComponents/JoinBlock';
import SessionClockBlock from '../../components/BlueRoomComponents/SessionClockBlock';
import CalendarBlock from '../../components/BlueRoomComponents/CalendarBlock';
import SvgLolaLogo from '../../assets/images/SvgModified/SvgLolaLogo';
import StartBlock from '../../components/BlueRoomComponents/StartBlock';
import Hidden from '@material-ui/core/Hidden';

export const BBR_HEADER_HEIGHT = 16.66; //vh currently not using, will only invoke if we want the tool bar grows with window
export const BBR_TOOL_PANEL_WIDTH = 5; //in vw currently not using, will only invoke if we want the tool bar grows with window
export const BBR_MIN_HEADER_HEIGHT = 100; //px
export const BBR_TOOL_PANEL_MIN_WIDTH = 50; //in px accommodate 1px border
export const BBR_HEADER_BOTTOM_BORDER = 4; //in px

/*******************   STILL LEARNING CODE STILL HAS TO COOK  ********************/

//using a wrapper in order to access SC theme within MUI component
// const HeaderWrapper = styled.div`
//   background-color: ${navBackgroundColor};
// `;

const ToggleBlock = styled.div`
  border: 0px solid gold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const useStyles = makeStyles({
  headeregion: {
    backgroundColor: `${navBackgroundColor}`,
    height: '100px',
    borderSpacing: '0',
  },

  singlesection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '.5px solid grey',
    alignContent: 'center',
  },

  sessionclocks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //border: '.5px solid pink',
    alignContent: 'center',
    height: '70px',
    //background: 'yellow',
  },

  lastinrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export const TheHeader = () => {
  const classes = useStyles();

  return (
    // <HeaderWrapper> //use this if accessing LolaTheme for dark light toggling
    <Grid
      container
      direction="row"
      justify="space-between"
      className={classes.headeregion}
    >
      <Grid item xs={3} sm={2} className={classes.singlesection}>
        <ToggleBlock>
          <SvgLolaLogo jamwerks="false" quiet="false" w="80px" />
          <ThemeToggleSwitch />
        </ToggleBlock>
      </Grid>
      <Grid item xs={3} sm={2} className={classes.singlesection}>
        <StartBlock />
      </Grid>
      <Grid item xs={3} sm={2} className={classes.singlesection}>
        <JoinBlock />
      </Grid>
      <Hidden xsDown>
        <Grid item sm={3} className={classes.singlesection}>
          <CalendarBlock />
        </Grid>
      </Hidden>
      <Grid item xs={3} sm={3} className={classes.lastinrow}>
        <SessionClockBlock />
      </Grid>
    </Grid>
    // </HeaderWrapper>
  );
};
