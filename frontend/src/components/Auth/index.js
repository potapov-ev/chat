import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from 'context/UserContext'

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
    setUserName(user.name);
    setUID(user.id)

    history.push("/chat");
  };

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