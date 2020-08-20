import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    font-family: "Verdana";
    font-size: 14px;
    scrollbar-color: #919496;
    scrollbar-width: 14px;
  }
  #root {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 14px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #919496;
  }
  
`;

export default GlobalStyles;