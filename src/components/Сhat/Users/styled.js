import styled from "styled-components";

const Container = styled.div`
  padding: 12px;
  min-width: 240px;
  max-width: 240px;
  height: 100%;
  color: ${p => p.theme.colors.primary };
  background-color: ${p => p.theme.backgroundColors.users};

  svg {
    fill: ${p => p.theme.colors.primary};
  }
`;

// todo добавить ... и tooltip

export {
  Container,
};