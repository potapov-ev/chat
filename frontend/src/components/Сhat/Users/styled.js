import styled from "styled-components";

const Container = styled.div`
  padding: 12px;
  min-width: 240px;
  max-width: 240px;
  height: 100%;
  color: ${p => p.theme.colors.primary };
  text-align: center;
  background-color: ${p => p.theme.backgroundColors.users};

  svg {
    fill: ${p => p.theme.colors.primary};
  }
`;

const Header = styled.div`
  padding: 6px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${p => p.theme.border};
`;

// todo добавить ... и tooltip

export {
  Container,
  Header
};