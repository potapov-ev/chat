import React, { useState } from 'react';

import {
  Container,
  InputGroup,
  StyledInput,
  StyledButton
} from "./styled";

const EnterChat = ({ setUserName }) => {
  const [name, setName] = useState("");
  console.log("EnterChat");
  const handleSubmit = e => {
    e.preventDefault();
    if (name) {
      setUserName(name);
    } else {
      // добавить warning
    }
  };

  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} >
        <InputGroup>
          <StyledInput
            placeholder="User name"
            value={name}
            onChange={handleChange}
          />
          <StyledButton
            type="submit">
            Join
          </StyledButton>
        </InputGroup>
      </form>
    </Container>
  )
};

export default EnterChat;