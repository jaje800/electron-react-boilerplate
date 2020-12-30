import React, { useEffect, useContext } from 'react';
import { LolaButton } from '../../GreenRoomComponents/LolaButton';
import { PageTitle } from '../PageTitle';
import {
  PageBorder,
  SINGLE_BTN_PADB,
} from '../../GreenRoomComponents/PageBorder';
import { NetworkTxt } from '../../../assets/LolaText';
import SvgSmiley from '../../../assets/images/SvgModified/SvgSmiley';
import { GreenRoomContext } from '../../../contexts/GreenRoomContext';

export default function GoodInternet() {
  const { setShownNetwork } = useContext(GreenRoomContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShownNetwork(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageBorder padb={SINGLE_BTN_PADB}>
        <PageTitle>{NetworkTxt.usingEthernetTitle}</PageTitle>
        <h4>{NetworkTxt.usingEthernetSubtitle}</h4>
        <SvgSmiley h="40vh" w="40vw" />
        {/* <LolaButton btnstyle="main" id="BBSBtn" txt="yay!" onClick={onClick} /> */}
      </PageBorder>
    </>
  );
}
