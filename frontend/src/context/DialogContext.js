import React, { useState } from 'react'

export const DialogContext = React.createContext({});

const DialogProvider = DialogContext.Provider;

const DialogContextProvider = ({ children }) => {
  const [currentDialogId, setCurrentDialogId] = useState(-1);

  return (
    <DialogProvider
      value={{
        currentDialogId,
        setCurrentDialogId
      }}
    >
      {children}
    </DialogProvider>
  )
};

export default DialogContextProvider;