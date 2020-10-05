import React, { useState, useRef, useContext } from 'react';
import { AppContext } from "context/AppContext";
import { UserContext } from 'context/UserContext';
import { DialogContext } from 'context/DialogContext';
import { StyledPopover, StyledButton, LinkButton } from "components/common";
import { THEME_CONSTANTS } from "constants/common";
import { PalleteIcon } from "icons";

import {
  Container,
  LogoContainer,
  LogoWrapper,
  Name,
  RightContaner,
} from "./styled";
// todo Переименовать на ХЕдер
const Navbar = () => {
  const { setLightTheme, setPurpleTheme, setDarkTheme } = useContext(AppContext);
  const { setUserName, setUID } = useContext(UserContext);
  const { setCurrentDialogId } = useContext(DialogContext);

  const [open, setOpen] = useState(false); // название
  const anchorEl = useRef(null);

  const handleSelect = text => { /* todo Переписать */
    switch (text) {
      case THEME_CONSTANTS[0].text:
        setLightTheme();
        break;
      case THEME_CONSTANTS[1].text:
        setPurpleTheme();
        break;
      case THEME_CONSTANTS[2].text:
        setDarkTheme();
        break;
      default:
        return;
    }
  };

  const logOut = () => {
    setUID(null)
    setUserName(null);
    setCurrentDialogId(null);
  };

  return (
    <Container>
      <LogoContainer>
        <LogoWrapper>

        </LogoWrapper>
        <Name>
          Chat
        </Name>
      </LogoContainer>

      <RightContaner>
        <StyledButton
          btnRef={anchorEl}
          onClick={() => setOpen(true)}
          color="inherit"
          endIcon={<PalleteIcon />}
        >
          Выбрать тему
        </StyledButton>
        <StyledPopover
          open={open}
          setOpen={setOpen}
          anchorEl={anchorEl.current}
          handleSelect={handleSelect}
          list={THEME_CONSTANTS}
        />

        <LinkButton
          href="https://github.com/mutik0137/chat"
        >
          Github
        </LinkButton>
        <LinkButton
          path="/auth"
          callback={logOut}
        >
          Выйти
        </LinkButton>
      </RightContaner>
    </Container>
  )
};
// todo что надо удалять у svg из абрибутов
export default Navbar;