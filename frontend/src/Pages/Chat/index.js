import React, { useContext, useEffect } from 'react';
import { DialogContext } from "context/DialogContext";
import Chat from "components/Сhat";
import NavBar from "components/NavBar";

import Container from "./styled";

const ChatPage = ({ location }) => {
  const { setCurrentDialogId } = useContext(DialogContext);

  useEffect(() => {
    const dialogId = location?.pathname.split("/").pop();

    if (dialogId && Number(dialogId) == dialogId) {
      setCurrentDialogId(dialogId);
    }

  }, [location?.pathname])

  return (
    <Container>
      <NavBar />
      <Chat />
    </Container>
  );
};

export default ChatPage;