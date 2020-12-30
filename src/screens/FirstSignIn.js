import React from 'react';
import { WorkingSpace } from '../components/GreenRoomComponents/WorkingSpace';
import { FirstTxt } from '../assets/LolaText';
import { ImportantMessage } from '../components/GreenRoomComponents/ImportantMessage';
import { Sidebar } from '../components/GreenRoomComponents/SidebarComponents/Sidebar';
import { WorkingContainer } from '../components/GreenRoomComponents/WorkingContainer';
import { SidebarImages } from '../components/GreenRoomComponents/SidebarComponents/SidebarImages';

import { LogoBox } from '../components/LogoBox';
import SvgLolaWithStars from '../assets/images/SvgModified/SvgLolaWithStars';

function FirstSignIn() {
  return (
    <>
      <Sidebar>
        <SidebarImages />
      </Sidebar>{' '}
      <WorkingContainer>
        <LogoBox top="2rem">
          <SvgLolaWithStars w="55vw" />
        </LogoBox>
        <WorkingSpace>
          <ImportantMessage>First Sign In Page Placeholder</ImportantMessage>
        </WorkingSpace>
      </WorkingContainer>
    </>
  );
}
export default FirstSignIn;
