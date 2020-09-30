import React, { 
  useState,
  useEffect,
  useContext,
  memo 
} from 'react';
import { UserIcon } from "icons";
import { UserContext } from 'context/UserContext'
import { 
  StyledDrawer, 
  List, 
  StyledButton,
  StyledDivider
} from 'components/common';
import { 
  userSource,
  dialogSource 
} from "sources";

import {
  Container,
  Header
} from "./styled"
// todo подумать над надписями
// todo переименовать в sidebar
const SideBar = () => {
  const { uid } = useContext(UserContext);

  const [isOpen, setOpen] = useState(false);
  const [users, setUsers]  = useState([]); // todo кроме меня
  const [dialogs, setDialogs] = useState([]);

  const getUsers = async () => {
    try {
      const res = await userSource.getAll(); // todo не получать пароль
      console.log(111, res);
      setUsers(res.data);
    } catch (error) {
      console.log("userSource.getAll", error);
    }
  };
  
  const getDialogs = async () => {
    try {
      const res = await dialogSource.getAll({ uid }); // todo не получать пароль
      setDialogs(res.data);
    } catch (error) {
      console.log("dialogSource.getAll", error);
    }
  };

  useEffect(() => {
    getDialogs();
    getUsers();
  }, []);

  const openDrawer = () => setOpen(true);
  /* todo добавить containers в каждом модуле */
  const handleSelect = user => {
    try {
      dialogSource.create({
        partnerId: user.uid, 
        lastUpdate: Date.now()
      });
    } catch (error) {
      console.log("dialogSource.create", error);
    }
  };
  // выделить хедер, чтобы дивидеры не слвались
  return (
    <Container>
      {
        console.log("NavBar")
      }
      <Header>
        <StyledButton
          onClick={openDrawer}
        >
          Найти друга
        </StyledButton>
      </Header>
      <StyledDivider />

      <StyledDrawer
        anchor="left"
        open={isOpen}
        setOpen={setOpen}
      > 
        <List
          list={users}
          rules={{
            primary: "name",
          }}
          Icon={UserIcon}
          handleSelect={handleSelect} // handleSelect todo придумать имя получше
          divider
          emptyListMessage="No Users Online"
          button
          styles={{
            color: "white",
            svgFill: "gray"
          }}
        />
      </StyledDrawer>
    
      <List
          list={dialogs}
          Icon={UserIcon}
          rules={{
            primary: "name",
            secondary: "lastMessage"
          }}
          divider
          /* button */
          /* styles={{
            color: "white",
            svgFill: "gray"
          }} */
        />
    </Container>
  );
};

const MemoizedSideBar = memo(SideBar);

export default MemoizedSideBar;