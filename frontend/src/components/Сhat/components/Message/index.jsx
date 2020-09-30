import React, { memo } from 'react';
import { formatNumber } from "utils";

import {
  Container,
  UserName,
  Time,
  Text,
  ImgContainer,
} from "./styled";

const Message = ({ message }) => (
  <Container
    isMy={localStorage.getItem('uid') === message.uid}
  >
    {
      console.log("Message", message)
    }
    <UserName>
      {message.userName}
    </UserName>
    <Time>
      {`${formatNumber(new Date(message.date).getHours())}:${formatNumber(new Date(message.date).getMinutes())}`}
    </Time>

    {
      message.message.type === 'message'
        ?
        <Text>
          {message.message.text}
        </Text>
        :
        <ImgContainer>
          <img
            src={message.message.url}
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