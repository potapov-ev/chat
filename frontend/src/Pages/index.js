import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserContext } from "context/UserContext"

import ChatPage from "./Chat";
import AuthPage from "./Auth";

const BasePage = () => {
  const { isUserLogged } = useContext(UserContext);
  return (
    <Switch>
      <Route path="/auth" render={AuthPage} />
      <Route path={["/", "/chat"]} render={({ location }) => (
        isUserLogged
          ? <ChatPage location={location} />
          : <Redirect to="/auth" />
      )} />
      <Redirect to="/auth" />
      {/* Добавить еррор пэйдж */}
    </Switch>
  )
};

export default BasePage;