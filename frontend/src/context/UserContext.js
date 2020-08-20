import React, { useState, useEffect } from 'react'
import { generateUID } from 'utils'

export const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;
/* todo Добавить уникальный ключ-префикс ко всем локалстораджам */
const UserContextProvider = ({ children }) => {
  const [uid] = useState(localStorage.getItem('uid') ? localStorage.getItem('uid') : generateUID());
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : "")

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName])

  return (
    <UserProvider
      value={{
        uid,
        userName,
        setUserName
      }}
    >
      {children}
    </UserProvider>
  )
};

export default UserContextProvider;