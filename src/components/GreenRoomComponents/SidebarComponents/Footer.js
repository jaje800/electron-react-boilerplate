import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import styled from 'styled-components/macro';
import { textColor } from '../../../contexts/styling/LolaTheme';
import { ThemeToggleSwitch } from '../../ThemeToggleSwitchComponent';

/*-------------------------------------------------------------------------
    Styled Footer Component
    Contains the toggle switch for dark/light theming
    Double clicking in the footer brings up a Dev Modal alert to display session data etc
     id: ${}
     type: ${}
    -------------------------------------------- //divider
    ---------------------------------------------------------------------------------------*/

function DevModal() {
  const os = require('os');
  const isDark = window.matchMedia('(prefers-color-scheme:dark)');
  const mode = isDark.matches ? 'dark' : 'light';
  alert(`
  preferred theme: ${mode}
  system info: ${os.release()}`);
}

const FooterBox = styled.span`
  height: ${(props) => props.height || '15%'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${textColor};
  cursor: default;
`;

export function Footer(props) {
  //const { userData, userId } = useContext(UserContext);

  return (
    <FooterBox onDoubleClick={() => DevModal()} height={props.height}>
      <ThemeToggleSwitch animate />
    </FooterBox>
  );
}
