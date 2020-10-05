import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from 'react';
import socket from 'Core/socket-io';
import { UserContext } from 'context/UserContext'
import { DialogContext } from 'context/DialogContext'
import { Loader } from "components/common";
import { getCurrentTime } from "utils";
import { messageSource } from "sources";
import {
  SideBar,
  Messages,
  TextForm,
  GiffBox,
} from "./components";
import videoSrc from "./pashalka.mp4";

import {
  Container,
  Dialog,
  Pashalka
} from "./styled";

const Chat = () => {
  // todo Мб заюзать lazy Suspense к GiffBox
  const { userName } = useContext(UserContext);
  const { currentDialogId } = useContext(DialogContext);
  const [messages, setMessages] = useState([]);
  const [isChatReady, setIsChatReady] = useState(false);
  const [isGiff, setIsGiff] = useState(false);
  // const messagesRef = useRef(null); // для обновления ссылки на массив messages, для работы сокета
  const pashalka = useRef(null);
  const video = useRef(null);

  console.log("Chat");
  /* useEffect(() => {
    messagesRef.current = messages;
  }); */

  useEffect(() => {
    if (socket) {
      const addMessage = message => {
        console.log(111, messages, message);
        setMessages([...messages, message])
      };
      console.log("SERVER:NEW_MESSAGE");
      socket.on("SERVER:NEW_MESSAGE", addMessage);

      return () =>
        socket.removeListener("SERVER:NEW_MESSAGE", addMessage);
    }
  }, [messages, socket])

  useEffect(() => {
    if (userName.length) {
      setIsChatReady(true);

      //if (socket?.disconnect) socket.disconnect();
    }
  }, [userName]);

  //#region 
  /* useEffect(() => {
    if (socket) {
      const helper = message => {
        setMessagesHelper(message, messagesRef.current);
      }

      socket.on('message', helper);

      return () => {
        socket.off('message', helper);
      };
    }
  }, [socket]);
  //#endregion

  const setMessagesHelper = (message, messages) => {
    setMessages([...messages, message]);
  }; */
  //#endregion

  const sendMessage = useCallback(async (message) => {
    if (message.text?.toLowerCase() === "атас") {
      pashalka.current.style.display = "block";
      video.current.play();
      setTimeout(() => pashalka.current.style.display = "none", 4000);
    }
    // todo Убрать messages из зависимостей, сообщения принимать с сервера
    // иначе от useCallback нет толка
    const newMessage = {
      type: message.type,
      text: message.text,
      url: message.url,
      dialogId: currentDialogId,
      time: getCurrentTime(),
      isReaded: false,
    };

    try {
      const res = await messageSource.create(newMessage);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log("messageSource.create", error);
    }
    /* socket.emit('message', {
      ...MessageInfo
    }); */
  }, [messages, currentDialogId]);

  const toggleGif = useCallback(() => {
    setIsGiff(!isGiff);
  }, [isGiff]);

  return (
    <Container>
      {
        isChatReady
          ?
          <>
            <SideBar />
            <Dialog>
              <Messages
                messages={messages}
                setMessages={setMessages}
                isGiff={isGiff}
                dialogId={currentDialogId}
              />
              {
                currentDialogId !== -1 && ( // todo переписать
                  isGiff
                    ?
                    <GiffBox
                      sendMessage={sendMessage}
                      toggleGif={toggleGif}
                    />
                    :
                    <TextForm
                      sendMessage={sendMessage}
                      toggleGif={toggleGif}
                    />
                )
              }
            </Dialog>
          </>
          :
          <Loader />
      }
      <Pashalka ref={pashalka} >
        <video ref={video}>
          <source src={videoSrc} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
        </video>
      </Pashalka>
    </Container>
  )
}

export default Chat;
