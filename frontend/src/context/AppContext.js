import React, { useState } from 'react'

export const AppContext = React.createContext({});

const AppProvider = AppContext.Provider;

const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") 
    ? localStorage.getItem("theme")
    : "lightTheme");

  const setLightTheme = () => {
    localStorage.setItem("theme", "lightTheme");
    setTheme("lightTheme");
  };

  const setPurpleTheme = () => {
    localStorage.setItem("theme", "purpleTheme");
    setTheme("purpleTheme");
  };

  const setDarkTheme = () => {
    localStorage.setItem("theme", "darkTheme");
    setTheme("darkTheme");
  };

  return (
    <AppProvider
      value={{
        theme,
        setLightTheme,
        setPurpleTheme,
        setDarkTheme
      }}
    >
      {children}
    </AppProvider>
  )
};

export default AppContextProvider;