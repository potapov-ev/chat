import React from "react";
import AppContextProvider from "./AppContext"
import UserContextProvider from "./UserContext"
import DialogContextProvider from "./DialogContext"

const ContextsProvider = ({ children }) => (
  <AppContextProvider>
    <UserContextProvider>
      <DialogContextProvider>
        {children}
      </DialogContextProvider>
    </UserContextProvider>
  </AppContextProvider>
);

export default ContextsProvider