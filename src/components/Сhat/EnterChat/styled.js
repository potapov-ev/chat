import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  height: 40px;
  background: red;
`;

const StyledInput = styled.input`
  height: 100%;
  /* todo */
`;

const StyledButton = styled.button`
  height: 100%;
`;

export {
  Container,
  InputGroup,
  StyledInput,
  StyledButton
};