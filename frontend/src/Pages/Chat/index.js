import React from 'react';

import Chat from "components/Сhat";
import NavBar from "components/NavBar";
import { themes } from "Core/themes";

import Container from "./styled";

const ChatPage = () => {
  const theme = themes.lightTheme;

  return (
    <Container>
      <NavBar
        backgroundColor={theme.myMessage}
      />
      <Chat 
        theme={theme}
      />
    </Container>
  );
};

export default ChatPage;