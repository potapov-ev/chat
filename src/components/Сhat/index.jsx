import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext
} from 'react';
import socketIOClient from 'socket.io-client';
import { UserContext } from 'context/UserContext'

import Users from "./Users";
import Messages from "./Messages";
import TextForm from "./TextForm";
import GifBox from "./GifBox";
import EnterChat from "./EnterChat";
import videoSrc from "./pashalka.mp4";

import {
  Container,
  Dialog,
  Pashalka
} from "./styled";

let socket = null;

const Chat = () => {
  // todo Разобраться с socket
  // todo обновить версии библиотек
  // todo подумать о лучшей архитектуре, распределение state, заюзать context
  // todo Мб заюзать lazy Suspense к GifBox
  const { uid } = useContext(UserContext);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');
  const [isChatReady, setIsChatReady] = useState(false);
  const [users, setUsers] = useState([]);
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
      localStorage.setItem('userName', userName);
      setIsChatReady(true);
      socket = socketIOClient('ws://localhost:8989', {
        query: 'userName=' + userName + '&uid=' + uid
      });

      socket.on('updateUsersList', users => {
        setUsers(users);
      });
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
      }
    }
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const setMessagesHelper = (message, messagess) => {
    setMessages(messagess.concat([message]));
  };

  const sendMessage = message => {
    if (message.text === "Ярик") {
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
            <Users users={users} />
            <Dialog>
              <Messages
                messages={messages}
                isGif={isGif}
                messagesEl={messagesEl}
              />
              {
                isGif
                  ?
                  <GifBox
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
          <EnterChat
            setUserName={setUserName}
          />
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
