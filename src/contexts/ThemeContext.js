import React, { useState, useContext, createContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import { backgroundColor, textColor } from './styling/LolaTheme';

const ThemeToggleContext = createContext();

export const useTheme = () => useContext(ThemeToggleContext);

const Wrapper = styled.div`
  background-color: ${backgroundColor};
  color: ${textColor};
`;

//sets theme to user's default theme
const isDark = window.matchMedia('(prefers-color-scheme:dark)');
let defaultMode = isDark.matches ? 'dark' : 'light';

export const MyThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useState({
    mode: defaultMode,
  });

  useEffect(() => {
    //listens for system preference theme change
    const themeListener = (event) => {
      if (event.matches) {
        setThemeState({ mode: 'dark' });
      } else {
        setThemeState({ mode: 'light' });
      }
    };
    window
      .matchMedia('(prefers-color-scheme:dark)')
      .addEventListener('change', themeListener);
    return () => {
      window
        .matchMedia('(prefers-color-scheme:dark)')
        .removeEventListener('change', themeListener);
    };
  }, []);

  const toggle = () => {
    const mode = themeState.mode === 'light' ? `dark` : `light`;
    setThemeState({ mode: mode });
  };

  return (
    <ThemeToggleContext.Provider value={{ toggle: toggle }}>
      <ThemeProvider
        theme={{
          mode: themeState.mode,
        }}
      >
        <Wrapper>{children}</Wrapper>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;

/*
          flexboxgrid: {
            gridSize: 12, // columns
            gutterWidth: 0, // rem
            outerMargin: 0, // rem
            //outerMargin: 2, // rem
            mediaQuery: 'only screen',
            container: {
              sm: 46, // rem
              md: 61, // rem
              lg: 76, // rem
            },
            breakpoints: {
              xs: 0, // em
              sm: 48, // em
              md: 64, // em
              lg: 75, // em
            },
          },
*/
