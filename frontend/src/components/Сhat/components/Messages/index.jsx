import React, {
  useEffect,
  useRef,
} from 'react';
import { messageSource } from "sources";
import Message from "../Message";

import {
  Container,
  PaddingBlock,
  NoMessages
} from "./styled";

const Messages = ({ messages, setMessages, isGiff, dialogId }) => {
  const messagesEl = useRef(null);

  const getMessages = async dialogId => {
    try {
      const res = await messageSource.getAll({ dialogId });
      setMessages(res.data); 
    } catch (error) {
      console.log("messageSource.getAll", error);
    }
  };

  useEffect(() => {
    if (dialogId !== -1) {
      getMessages(dialogId);
    }
  }, [dialogId]);

  const scrollToBottom = () => {
    if (messagesEl?.current) {
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight - messagesEl.current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  return (
    <>
      <Container
        formHeight={isGiff ? 240 : 40}
        ref={messagesEl}
      >
        {
          console.log("Messages", messages)
        }
        {
          messages.length
            ?
            messages.map(message => {
              return (
                <Message
                  key={message.id}
                  message={message}
                />
              )
            })
            :
            <NoMessages>No messages in chat room</NoMessages>
        }
      </Container>
      <PaddingBlock />
    </>
  );
};

export default Messages;