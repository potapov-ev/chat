import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ChatPage from "./Chat";
import AuthPage from "./Auth";

const BasePage = () => {

  return (
    <>
      <Route exact path={[ "/", "/chat" ]} render={ChatPage} />
      <Route path="/auth" render={AuthPage} />
    </>
  )
};

export default BasePage;