import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { round } from 'lodash';
import { Grid, makeStyles } from '@material-ui/core';
import { fontSizes } from '../../../contexts/styling/LolaTheme';
import { StatusBarTxt } from '../../../assets/LolaText';
import SvgSmiley from '../../../assets/images/SvgModified/SvgSmiley';
import SvgFrowny from '../../../assets/images/SvgModified/SvgFrowny';
import SvgNeutral from '../../../assets/images/SvgModified/SvgNeutral';
import { getNetworkRank } from '../../../utils/netInfoUtils';
import { networkConditionsSelector } from '../../../controllers/NetworkConditionsController';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';

export function showMilliseconds(microseconds) {
  // basic rule for display.  If there are
  // at least 10 ms to display, display the
  // number as an integer.  If there are
  // between 1 and 10 ms, display it with
  // a single digit before the decimal and
  // a single digit after.  If there are less
  // then 1 ms, display as two digits after
  // the decimal
  if (microseconds > 10000) return Math.round(microseconds / 1000);
  if (microseconds > 1000) return Math.round(microseconds / 100) / 10;
  let msecs = microseconds / 1000;
  let rounded = round(msecs, 2);
  return rounded.toFixed(2);
}

const useStyles = makeStyles({
  //one style for the whole grid
  networkstatus: {
    fontSize: fontSizes.txt,
    //backgroundColor: colors.lolaRedDim, //used this to visualize spacing and framing
  },

  //one style for each subsection of the grid
  singlesection: {
    lineHeight: '1em',
    paddingTop: '.5em',
  },
  smallerfont: {
    fontSize: fontSizes.mini,
    lineHeight: '1.25em',
  },
});

function NetworkNumbers({ value }) {
  return (
    <Grid item xs={3}>
      <Grid container direction="row" justify="space-around">
        <Grid item>
          {value > 0 ? showMilliseconds(value) : StatusBarTxt.noValue}
        </Grid>
      </Grid>
    </Grid>
  );
}

export function NetworkStatus({ isOffline }) {
  const classes = useStyles();
  const networkConditions = useSelector(networkConditionsSelector);
  const { blink } = useContext(GreenRoomContext);

  // determine which messages, comments, and emoji should who used based on network rank
  function NetworkMessage() {
    let rank = getNetworkRank(networkConditions, isOffline);
    switch (rank) {
      case -1:
        return (
          <NetworkType
            message={StatusBarTxt.NWnoneMessage}
            comment={StatusBarTxt.NWnoneComment}
          >
            <SvgFrowny blink={blink} />
          </NetworkType>
        );
      case 1:
        return (
          <NetworkType
            message={StatusBarTxt.NWwifiMessage}
            comment={StatusBarTxt.NWwifiComment}
          >
            <SvgNeutral blink={blink} />
          </NetworkType>
        );
      case 2:
        return (
          <NetworkType
            message={StatusBarTxt.NWunstableMessage}
            comment={StatusBarTxt.NWunstableComment}
          >
            <SvgNeutral blink={blink} />
          </NetworkType>
        );
      case 3:
        return (
          <NetworkType
            message={StatusBarTxt.NWethernetMessage}
            comment={StatusBarTxt.NWethernetComment}
          >
            <SvgSmiley blink={blink} />
          </NetworkType>
        );
      default:
        return null;
    }
  }

  function NetworkType({ message, comment, children }) {
    return (
      <Grid container direction="column" justify="center">
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          {message}
          {children}
        </Grid>
        <Grid item className={classes.smallerfont}>
          {comment}
        </Grid>
      </Grid>
    );
  }

  if (!networkConditions) return <p>{StatusBarTxt.calculating}</p>;
  return (
    <Grid container direction="column" className={classes.networkstatus}>
      <Grid item className={classes.singlesection}>
        <NetworkMessage />
      </Grid>
      <Grid item className={classes.singlesection}>
        <Grid container direction="row" justify="space-evenly">
          <NetworkNumbers value={networkConditions.latencyMicroseconds} />
          <NetworkNumbers value={networkConditions.jitterMicroseconds} />
          <Grid
            container
            direction="row"
            justify="space-evenly"
            className={classes.smallerfont}
          >
            <Grid item>{StatusBarTxt.latency}</Grid>
            <Grid item>{StatusBarTxt.jitter}</Grid>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          className={classes.singlesection}
        >
          <Grid item className={classes.smallerfont}>
            {StatusBarTxt.serverRgn} {networkConditions.region}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
