import React from 'react';
import ReactDOM from 'react-dom';
import UserContextProvider from "context/UserContext";
import AppContextProvider from "context/AppContext";
import ThemeProvider from 'Core/ThemeProvider'

import BasePage from "./Pages";

class App extends React.Component {

  render() {
    return (
      <AppContextProvider>
        <ThemeProvider>
          <UserContextProvider>
            <BasePage />
          </UserContextProvider>
        </ThemeProvider>
      </AppContextProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
