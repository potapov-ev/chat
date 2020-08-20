import React, { useContext } from 'react'
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { AppContext } from "context/AppContext"

import GlobalStyles from "./GlobalStyles";
import { themes } from './themes'


const ThemeProvider = ({ children }) => {
  const { theme } = useContext(AppContext);
  return (
    <>
      <SCThemeProvider
        theme={themes[theme]}
      >
        {children}
      </SCThemeProvider>
      <GlobalStyles />
    </>
  )
};

export default ThemeProvider;