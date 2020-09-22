import React, { 
  useState,
  memo 
} from 'react';
import { UserIcon } from "icons";
import { 
  StyledDrawer, 
  List, 
  StyledButton,
  StyledDivider
} from 'components/common';

import {
  Container,
  Header
} from "./styled"
// todo подумать над надписями
// todo переименовать в sidebar
const Users = ({ users }) => {
  const [isOpen, setOpen] = useState(false);
  const [dialogs, setDialogs] = useState([{
    name: "Общая комната",
    lastMessage: "Всем привет"
  }]);

  const openDrawer = () => setOpen(true);

  const addFriend = user => {
    setDialogs([...dialogs, {
      name: user // todo изменить массив users, передавать туда больше инфы
    }]);
  };
  // выделить хедер, чтобы дивидеры не слвались
  return (
    <Container>
      {
        console.log("Users")
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
          Icon={UserIcon}
          handleSelect={addFriend} // handleSelect todo придумать имя получше
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

const MemoizedUsers = memo(Users);

export default MemoizedUsers;