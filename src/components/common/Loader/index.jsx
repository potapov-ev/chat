import React, { useContext } from "react";
import { AppContext } from "context/AppContext";
import { THEME_CONSTANTS } from "constants/common";

import {
  DarkContainer,
  LoadInnerOne,
  LoadInnerTwo,
  LoadInnerThree,

  LightContainer,
  Circle,
  Shadow,
} from "./styled"

const Loader = () => {
  const { theme } = useContext(AppContext);

  return (
    <>
      {
        THEME_CONSTANTS[0].themeName === theme
          ?
          <LightContainer>
            <Circle />
            <Circle />
            <Circle />
            <Shadow />
            <Shadow />
            <Shadow />
          </LightContainer>
          :
          <DarkContainer>
            <LoadInnerOne />
            <LoadInnerTwo />
            <LoadInnerThree />
          </DarkContainer >
      }
    </>
  )
};

export default Loader;