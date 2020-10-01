import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from 'react';
import socket from 'Core/socket-io';

import { UserContext } from 'context/UserContext'
import { Loader } from "components/common";
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
  // todo Разобраться с socket
  // todo обновить версии библиотек
  // todo подумать о лучшей архитектуре, распределение state, заюзать context
  // todo Мб заюзать lazy Suspense к GiffBox
  const { userName } = useContext(UserContext);
  const [isChatReady, setIsChatReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGif, setIsGif] = useState(false);
  const messagesEl = useRef(null); // ссылка на DOM-элемент messages
  const messagesRef = useRef(null); // для обновления ссылки на массив messages, для работы сокета
  const pashalka = useRef(null);
  const video = useRef(null);

  console.log("Chat");
  useEffect(() => {
    messagesRef.current = messages;
  });

  useEffect(() => {
    if (userName.length) {
      setIsChatReady(true);

      if (socket?.disconnect) socket.disconnect();
    }
  }, [userName]);

  useEffect(() => {
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const setMessagesHelper = (message, messages) => {
    setMessages([...messages, message]);
  };

  const sendMessage = message => {
    if (message.text?.toLowerCase() === "ярик") {
      pashalka.current.style.display = "block";
      video.current.play();
      setTimeout(() => pashalka.current.style.display = "none", 4000);
    }
    // todo Убрать messages из зависимостей, сообщения принимать с сервера
    // иначе от useCallback нет толка
    const MessageInfo = {
      id: Date.now(),
      userName: localStorage.getItem('userName'),
      uid: localStorage.getItem('uid'),
      date: new Date(),
      message: message,
    };

    setMessages(
      messages.concat([{
        ...MessageInfo
      }])
    );
    console.log(32)
    socket.emit('message', {
      ...MessageInfo
    });
  };

  const scrollToBottom = () => {
    if (messagesEl?.current) {
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight - messagesEl.current.clientHeight;
    }
  };

  const toggleGif = useCallback(() => {
    setIsGif(!isGif);
  }, [isGif]);

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
                isGif={isGif}
                messagesEl={messagesEl}
              />
              {
                isGif
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
