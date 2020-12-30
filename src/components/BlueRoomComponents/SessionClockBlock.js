import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../contexts/styling/LolaTheme';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import Hidden from '@material-ui/core/Hidden';

const SESSION_LEN_MINS = 5; //number of minutes in a session

/*---------------------------------------------------------------------------------
The TimerBox for the session countdown timer
accepts a prop shade to control the background as a warning color
possibly yellow at the halfway mark, and red at the five minute mark
---------------------------------------------------------------------------------*/
const TimerBox = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-right: 1px solid ${colors.lolaGray};
  border-bottom: 1px solid ${colors.lolaGray};
  background-color: ${({ shade }) => shade};
  height: 50px;
  width: 100%;
  align-items: center;
`;

/*---------------------------------------------------------------------------------
The TimePart is the number of hrs or min left
---------------------------------------------------------------------------------*/
const TimePart = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  padding-right: 0.2em;
`;

/*---------------------------------------------------------------------------------
The DisplayCounter displays the countdown timer
removing seconds for now
---------------------------------------------------------------------------------*/
function DisplayCounter(props) {
  return (
    <>
      <TimePart>{props.hrs} hr</TimePart>
      <TimePart>{props.mins} min</TimePart>
    </>
  );
}

/*---------------------------------------------------------------------------------
The DisplayWarning currently just shows text stating that the session has expred.
Room for props, room for more styling based on what we want to do
---------------------------------------------------------------------------------*/
function DisplayWarning(props) {
  return (
    <div style={{ fontSize: '16px', color: colors.lolaRed }}>
      your session has expired
    </div>
  );
}

/*---------------------------------------------------------------------------------
The SessionClocks contains the countdown clock (days and seconds are calculated,
but not shown) and the regular time clock
removing seconds for now til I check with Robin
            secs={timeLeft.seconds()}
---------------------------------------------------------------------------------*/
//need to figure out where session time is stored and how to persist if page is refreshed

export default function SessionClockBlock() {
  const [timeStr, setTimeStr] = useState(); // for the clock
  const endSessionTime = moment().add(SESSION_LEN_MINS, 'minutes');
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(endSessionTime.diff(moment()))
  ); //calc diff between now (moment()) and endSessionTime and store in moment.duration

  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    //this shows the digital clock
    let currentTime = moment();
    setTimeStr(currentTime.format('h:mm a').toUpperCase()); // "3:25:50 pm"

    const timeRemaining = endSessionTime.diff(moment());
    if (timeRemaining > 0) {
      setTimeLeft(moment.duration(timeRemaining));
    } else {
      setTimeLeft(null);
    }
  };

  const outoftime = timeLeft === null;

  return (
    <>
      <Grid container direction="column" justify="center">
        <Grid item m={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center"
            spacing={0}
          >
            <Grid item xs={12} sm={7}>
              <TimerBox>
                {outoftime ? (
                  <DisplayWarning />
                ) : (
                  <DisplayCounter
                    hrs={timeLeft.hours()}
                    mins={timeLeft.minutes()}
                  />
                )}
              </TimerBox>
            </Grid>
            <Grid item xs={12} sm={5}>
              <TimerBox>{timeStr}</TimerBox>
            </Grid>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item m={12}>
            <TimerBox>waiting room</TimerBox>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
}
