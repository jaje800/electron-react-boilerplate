import React from 'react';
import { useSelector } from 'react-redux';
import { colors } from '../../../contexts/styling/LolaTheme';
import { NetworkStatus } from './NetworkStatus';
import { Grid, makeStyles } from '@material-ui/core';
import { ThemeToggleSwitch } from '../../ThemeToggleSwitchComponent';
import { useCurrentDimensions, minVisible } from '../../../utils/sizingUtils';
import StatusBox from './StatusBox';
import {
  defaultMicrophone,
  defaultSpeaker,
} from '../../../utils/AudioDeviceUtils';
import { StatusBarTxt } from '../../../assets/LolaText';
import {
  getNetworkRank,
  getNetworkStatus,
  useOnlineStatus,
} from '../../../utils/netInfoUtils';
import { networkConditionsSelector } from '../../../controllers/NetworkConditionsController';
import {
  getDeviceInputStatus,
  getDeviceOutputStatus,
  getMicSetupName,
  getSpeakerSetupName,
} from '../../../utils/checklistUtils';

const useStyles = makeStyles({
  statusregion: {
    flexGrow: 1,
    backgroundColor: colors.lolaBlueNight,
    padding: '.5em .25em 0',
  },
});

export function OnboardingChecklist({ micTouched, headphTouched }) {
  const classes = useStyles();
  const availableDevices = useSelector((state) => state.availableAudioDevices);
  const networkConditions = useSelector(networkConditionsSelector);
  const anyMicSaved = defaultMicrophone(availableDevices) != null;
  const anySpeakerSaved = defaultSpeaker(availableDevices) != null;
  const unsavedMicSetupName = useSelector((state) => state.micsetup);
  const unsavedSpeakerSetupName = useSelector((state) => state.speakersetup);

  let collapseHeight = 0.7; //percentage of screen visible before collapsing with conditional rendering
  let screen = useCurrentDimensions(); //calls a listener that returns the screen height and width
  let safeRatio = screen.width / screen.height < minVisible(collapseHeight);

  function MicSetupName() {
    let setupName = unsavedMicSetupName
      ? unsavedMicSetupName
      : getMicSetupName(availableDevices);
    return <p>{setupName}</p>;
  }

  function SpeakerSetupName() {
    let setupName = unsavedSpeakerSetupName
      ? unsavedSpeakerSetupName
      : getSpeakerSetupName(availableDevices);
    return <p>{setupName}</p>;
  }

  let isOffline = useOnlineStatus(); //need this to update the status checkbox
  return (
    <Grid container className={classes.statusregion}>
      <Grid container direction="column" justify="space-between">
        <Grid item>
          <StatusBox
            title={StatusBarTxt.NWstatusTitle}
            result={
              getNetworkStatus(getNetworkRank(networkConditions, isOffline))
                .result
            }
            flagged={
              getNetworkStatus(getNetworkRank(networkConditions)).flagged
            }
          >
            {safeRatio && <NetworkStatus isOffline={isOffline} />}
          </StatusBox>
        </Grid>
        <Grid item>
          {(micTouched || anyMicSaved) && (
            <StatusBox
              title={StatusBarTxt.MicStatusTitle}
              result={getDeviceInputStatus(availableDevices)}
            >
              <MicSetupName />
            </StatusBox>
          )}
        </Grid>
        <Grid item>
          {(headphTouched || anySpeakerSaved) && (
            <StatusBox
              title={StatusBarTxt.HPStatusTitle}
              result={getDeviceOutputStatus(availableDevices)}
            >
              <SpeakerSetupName />
            </StatusBox>
          )}
        </Grid>
        <Grid item>
          <ThemeToggleSwitch animate />
        </Grid>
      </Grid>
    </Grid>
  );
}
