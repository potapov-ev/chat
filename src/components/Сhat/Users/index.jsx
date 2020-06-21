import React, { memo } from 'react';
import { UserIcon } from "icons";
import { List } from 'components/common'

import {
  Container,
} from "./styled"


const Users = ({ users }) => (
  <Container>
    {
      console.log("Users")
    }
    <List
      list={users}
      Icon={UserIcon}
      divider
      emptyListMessage="No Users Online"
    />
  </Container>
);

const MemoizedUsers = memo(Users);

export default MemoizedUsers;