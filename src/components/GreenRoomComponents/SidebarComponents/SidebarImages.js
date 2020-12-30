import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../../contexts/styling/LolaTheme';
import navBadCat from '../../../assets/images/SidebarImages/navBadCat.jpg';
import navGuitar from '../../../assets/images/SidebarImages/navGuitar.jpg';
import navPiano from '../../../assets/images/SidebarImages/navPiano.jpg';
import navRME from '../../../assets/images/SidebarImages/navRME.jpg';
import { Footer } from './Footer';

/*-------------------------------------------------------------------------
    SidebarImages Component
    Contains the old nav bar with instrument images used on the first screens
    before entering the green room
---------------------------------------------------------------------------------------*/
const ImageAreaContainer = styled.div`
  height: 85%; //leaves room for the toggle switch
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  background: url('${(props) => props.bgImg}') no-repeat center center;
  background-size: cover;
  width: 100%;
  height: 100%;
  margin-top: 5vh;
  box-shadow: 0px 3px 6px #00000040;
  border: 1px solid ${colors.lolaBlackSoft};
`;

export function SidebarImages(props) {
  return (
    <>
      <ImageAreaContainer>
        <ImageBox bgImg={navRME}></ImageBox>
        <ImageBox bgImg={navGuitar}></ImageBox>
        <ImageBox bgImg={navPiano}></ImageBox>
        <ImageBox bgImg={navBadCat}></ImageBox>
      </ImageAreaContainer>
      <Footer />
    </>
  );
}
