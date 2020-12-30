import React from 'react';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { LolaButton } from '../../components/GreenRoomComponents/LolaButton';
import styled from 'styled-components';
import { colors } from '../../contexts/styling/LolaTheme';

const ScheduleButton = styled(LolaButton)`
  min-width: 65px;
  width: 35px;
  font-size: 14px;
  padding: 0;
  margin: 0;
  height: 35px;
  line-height: 1em;
  background-color: ${colors.lolaGray};
`;

function CalendarBlock() {
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
            <Hidden smDown>
              <Grid item sm={4}>
                <ScheduleButton
                  btnstyle="form"
                  type="submit"
                  id="schedSessionBtn"
                  txt="schedule Session"
                  disabled={true}
                />
              </Grid>
            </Hidden>

            <Grid item sm={8}>
              <div style={{ fontSize: '20px', color: colors.lolaGray }}>
                coming up next...
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CalendarBlock;
