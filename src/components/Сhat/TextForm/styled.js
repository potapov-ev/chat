import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: end;
  background-color: ${p => p.theme.backgroundColors.messages};
`;

export {
  Container,
};