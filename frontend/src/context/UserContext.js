import React, { useState, useEffect } from 'react'

export const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;
/* todo Добавить уникальный ключ-префикс ко всем локалстораджам */
const UserContextProvider = ({ children }) => {
  const [uid, setUID] = useState(localStorage.getItem('uid') || "");
  const [userName, setUserName] = useState(localStorage.getItem('userName') || "")

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);

  useEffect(() => {
    if (uid) {
      localStorage.setItem('uid', uid);
    }
  }, [uid]);

  return (
    <UserProvider
      value={{
        uid,
        setUID,
        userName,
        setUserName,
        isUserLogged: uid && userName
      }}
    >
      {children}
    </UserProvider>
  )
};

export default UserContextProvider;