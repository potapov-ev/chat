import React, { useState, useRef, useContext } from 'react';
import { AppContext } from "context/AppContext"
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

const Navbar = () => {
  const { setLightTheme, setPurpleTheme, setDarkTheme } = useContext(AppContext);
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
        >
          Выйти
        </LinkButton>
      </RightContaner>
    </Container>
  )
};
// todo что надо удалять у svg из абрибутов
export default Navbar;