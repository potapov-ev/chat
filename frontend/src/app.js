import React from 'react';
import ReactDOM from 'react-dom';
import ContextsProvider from "context";
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

        <ContextsProvider>
          <ThemeProvider>
            <BrowserRouter>
              <BasePage />
            </BrowserRouter>
          </ThemeProvider>
        </ContextsProvider>

        {/* </React.StrictMode> */}
      </>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
