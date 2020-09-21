import React, { 
  useState,
  memo 
} from 'react';
import { UserIcon } from "icons";
import { StyledDrawer, List, StyledButton } from 'components/common'

import {
  Container,
  Header
} from "./styled"
// todo подумать над надписями
// todo переименовать в sidebar
const Users = ({ users }) => {
  const [isOpen, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);

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
      
        
      <StyledDrawer
        anchor="left"
        open={isOpen}
        setOpen={setOpen}
      > 
        <List
          list={users}
          Icon={UserIcon}
          divider
          emptyListMessage="No Users Online"
        />
      </StyledDrawer>
    </Container>
  );
};

const MemoizedUsers = memo(Users);

export default MemoizedUsers;