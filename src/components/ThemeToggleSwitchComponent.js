import React from 'react';
import styled from 'styled-components/macro';
import {
  toggleBackground,
  toggleBackgroundStatic,
  sunMotion,
  moonMotion,
  toggleGlow,
} from '../LolaTheme';
import { useTheme } from '../contexts/ThemeContext';
import { ReactComponent as MoonIcon } from '../assets/images/ThemeToggleImages/moonshine.svg';
import { ReactComponent as SunIcon } from '../assets/images/ThemeToggleImages/sunshine.svg';

const ToggleContainer = styled.div`
  background: url(${(props) =>
      props.animate ? toggleBackground : toggleBackgroundStatic})
    no-repeat center;
  //background: url(${toggleBackground}) no-repeat center;
  //border: ${(props) => (props.animate ? `1px solid hotpink` : 'none')};

  background-size: 100px 33.3px;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px;
  margin: 0.5em auto 0.5em; //center within bounding box
  overflow: hidden;
  //position: relative;
  width: 100px;
  height: 33.3px;
  &:hover {
    box-shadow: 0 0.5px 8px ${toggleGlow};
    transition: all ease-out;
  }
  svg {
    height: 99%;
    width: 2.5rem;
    transition: all 0.4s linear;
    &:first-child {
      transform: ${sunMotion};
    }
    &:nth-child(2) {
      transform: ${moonMotion};
    }
  }
`;

export function ThemeToggleSwitch(props) {
  const themeToggle = useTheme();
  return (
    <ToggleContainer {...props} onClick={() => themeToggle.toggle()}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
}
