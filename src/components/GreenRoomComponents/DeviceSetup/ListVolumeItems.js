import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { LolaButton } from '../LolaButton';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';
import SaveMicSetup from './SaveMicSetup';
import {
  colors,
  fontSizes,
  btnBackgroundSelect,
  borderRadius,
  btnTextColor,
  backgroundColor,
} from '../../../contexts/styling/LolaTheme';
import SvgVolumeMeter from '../../../assets/images/SvgModified/SvgVolumeMeter';
import SvgDropdownTriangle from '../../../assets/images/SvgModified/SvgDropdownTriangle';
import { List, Collapse } from '@material-ui/core';
import { css } from 'styled-components';
import { MicTxt } from '../../../assets/LolaText';
import { motion } from 'framer-motion';
import claphands from '../../../assets/images/claphands.png';

let soundDetected = false;
export const VolItemContainer = styled.div`
  font-size: ${fontSizes.button};
  padding: 0.1em 0.2em 0.1em
    ${({ spacefor }) => (spacefor === 'true' ? '2em' : '.2em')};
  border-radius: ${borderRadius}px;
  display: flex;
  cursor: default;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 40vw;
  svg {
    transition: all 0.4s linear;
    &:first-child {
      &:hover {
        cursor: pointer;
      }
      height: 1em;
      width: 1em;
      position: absolute;
      left: 0.2em;
    }
    /*
    &:nth-child(2) {
      //this could cover the volume meter if there are any specifics needed
   } */
  }
  ${(props) =>
    props.spacefor === 'true' &&
    css`
      &:hover {
        cursor: pointer;
        color: ${btnTextColor};
        background-color: ${btnBackgroundSelect};
        border-radius: ${borderRadius}px;
      }
    `}
`;

const DropList = styled(List)`
  width: 40vw;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  //border color changes, but size stays the same to eliminate shift
  border: 1px solid
    ${({ spacefor }) =>
      spacefor === 'true' ? `${colors.lolaGray}` : `${backgroundColor}`};
`;

export function ListVolumeItems({ setDevice }) {
  const { setSelectedMicrophone, setNextSubComponent } = useContext(
    GreenRoomContext
  );
  const loudestDevice = useSelector((state) => state.loudestDeviceInfo);
  const availableDevices = useSelector((state) => state.availableAudioDevices);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkSound, setCheckSound] = useState(false);

  let multipleOptions = Object.keys(availableDevices.input).length > 1;
  let userDeviceId = selectedDeviceId || loudestDevice.deviceId;

  let devicePayload = {
    deviceId: userDeviceId,
    channels: '', //WIP needs to grab channels from somewhere thats not audioLevels -- audioLevels causes re-rendering glitch
    //going to grab channels in SaveMicSetup.js for now.
  };

  //creates a pause for the clapping graphic to show before the sound is checked and replaced by the ListVolumeItems
  useEffect(() => {
    let pause = setTimeout(() => {
      setCheckSound(true);
    }, 1000);
    return () => clearTimeout(pause);
  }, []);

  function SaveMicComp(selectedDeviceId) {
    return <SaveMicSetup selectedMicrophoneId={selectedDeviceId} />;
  }

  if (checkSound) soundDetected = loudestDevice.deviceId === '' ? false : true;

  const SingleVolumeItem = ({ selected, dropdown }) => {
    const stillAvailable = userDeviceId in availableDevices.input;

    if (!stillAvailable) {
      setSelectedDeviceId(null); //also not
      userDeviceId = Object.keys(availableDevices.input)[0]; //Thank you Wesley!
    }

    if (typeof setDevice === 'function') {
      setDevice(devicePayload);
    }

    return Object.keys(availableDevices.input) //getting array of all available names
      .filter(function (elem) {
        return selected ? elem === userDeviceId : elem !== userDeviceId;
      })
      .map((key) => {
        //gets called on each item that passes the filter
        const name = availableDevices.input[key].name;
        return (
          <div key={key}>
            <VolItemContainer
              spacefor={multipleOptions ? 'true' : 'false'}
              isopen={open ? 'true' : 'false'}
              onClick={(e) => {
                if (open) {
                  setOpen(!open);
                  setSelectedDeviceId(key);
                }
              }}
            >
              {multipleOptions && dropdown && (
                <div
                  style={{ position: 'absolute', left: '0.3em', top: '0.3em' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                >
                  {/* i dont know how else to do this right now -- if we want just the Svg to have the onClick
                rather than the whole container.
                this is superrrr hacky (hence the in-line style, i just wanted a quick fix)...
                should we use redux here instead?  */}
                  <SvgDropdownTriangle open={open} />
                </div>
              )}
              <div>{name}</div>
              <SvgVolumeMeter w="15vw" deviceId={key} />
            </VolItemContainer>
          </div>
        );
      });
  };
  return (
    <>
      {soundDetected ? (
        <>
          <DropList
            component="nav"
            aria-labelledby="nested-list-subheader"
            disablePadding
            spacefor={multipleOptions ? 'true' : 'false'}
          >
            <SingleVolumeItem selected dropdown />
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <SingleVolumeItem selected={false} />
              </List>
            </Collapse>
          </DropList>
          {!open && (
            <>
              <LolaButton
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: 0.01 }}
                btnstyle="main"
                id="useThisMicBtn"
                txt={MicTxt.useThisMicBtn}
                onClick={() => {
                  setSelectedMicrophone(true);
                  let dev = selectedDeviceId ? selectedDeviceId : userDeviceId;
                  setNextSubComponent(SaveMicComp(dev));
                }}
              />
              <LolaButton
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: 0.01 }}
                btnstyle="main"
                id="advMicSetupBtn"
                txt={MicTxt.advMicSetupBtn}
                disabled={true}
                onClick={() => {}}
              />
            </>
          )}
        </>
      ) : (
        <motion.img
          src={claphands}
          alt="clapping"
          width="100vw"
          height="100vw"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ ease: 'easeInOut', yoyo: 2, duration: 0.25 }}
        />
      )}
    </>
  );
}
