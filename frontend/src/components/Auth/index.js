import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from 'context/UserContext'
import socket from 'Core/socket-io';

import Register from "./Register.jsx";
import Login from "./Login.jsx";

import {
  PageContainer,
} from "./styled";

const Auth = ({ history }) => {
  console.log("Auth");

  const { setUserName, setUID } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);

  const toChat = (user = {}) => {
    setUID(user.uid)
    setUserName(user.name);

    socket.emit("CLIENT:LOG_IN", user.uid);

    history.push("/chat");
  };
  // todo сделать нормальный logout passport
  return (
    <PageContainer>
      {
        isLogin ?
          <Login
            setIsLogin={setIsLogin}
            toChat={toChat}
          />
          :
          <Register
            setIsLogin={setIsLogin}
            toChat={toChat}
          />
      }
    </PageContainer>
  )
};

export default withRouter(Auth);