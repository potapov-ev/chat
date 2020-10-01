import React, { memo } from 'react';

import {
  Container,
  UserName,
  Time,
  Text,
  ImgContainer,
} from "./styled";

const Message = ({ message }) => (
  <Container
    isMy={Number(localStorage.getItem('uid')) === message.authorId}
  >
    {
      console.log("Message")
    }
    <UserName>
      {localStorage.getItem('userName')} {/* todo заменить все localStorage по возиожности  */}
    </UserName>
    <Time>
      {message.time}
    </Time>

    {
      message.type === 'TEXT'
        ?
        <Text>
          {message.text}
        </Text>
        :
        <ImgContainer>
          <img
            src={message.url}
            alt="Gif"
          />
        </ImgContainer>
    }

  </Container>
);

const notNeedToUpdate = (prevProps, nextProps) => (
  prevProps.message.id === nextProps.message.id
);

const MemoizedMessage = memo(Message, notNeedToUpdate);

export default MemoizedMessage;