import React from 'react';

import Message from "../Message";

import {
  Container,
  PaddingBlock,
  NoMessages
} from "./styled";

const Messages = ({ messages, isGif, messagesEl }) => (
  <>
    <Container
      formHeight={isGif ? 240 : 40}
      ref={messagesEl}
    >
      {
        console.log("Messages")
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

export default Messages;