import React, { useState } from 'react'
import { generateUID } from 'utils'

export const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;

const UserContextProvider = ({ children }) => {
  const [uid] = useState(localStorage.getItem('uid') ? localStorage.getItem('uid') : generateUID());

  return (
    <UserProvider
      value={{
        uid
      }}
    >
      {children}
    </UserProvider>
  )
};

export default UserContextProvider;