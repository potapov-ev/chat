import React from 'react';
import ReactDOM from 'react-dom';
import UserContextProvider from "context/UserContext";
import AppContextProvider from "context/AppContext";
import ThemeProvider from 'Core/ThemeProvider'
import { BrowserRouter } from 'react-router-dom';

import "core-js/stable";
import "regenerator-runtime/runtime"; 

import BasePage from "./Pages";

class App extends React.Component {

  render() {
    return (
      <>
        {/* <React.StrictMode> */}

        <AppContextProvider>
          <ThemeProvider>
            <UserContextProvider>
              <BrowserRouter>
                <BasePage />
              </BrowserRouter>
            </UserContextProvider>
          </ThemeProvider>
        </AppContextProvider>

        {/* </React.StrictMode> */}
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
