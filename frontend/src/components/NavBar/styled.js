import styled from "styled-components";

const Container = styled.div`
  height: 59px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${p => p.theme.backgroundColors.navBar};
  border-bottom: ${p => p.theme.border}; /* todo убрать везде */ 
`;

const LogoContainer = styled.div`
  padding: 12px 24px;
`;

const LogoWrapper = styled.div`
  /* todo */
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const RightContaner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Styled_a = styled.a`
  color: inherit;
  text-decoration: none;
`;

export {
  Container,
  LogoContainer,
  LogoWrapper,
  Name,
  RightContaner,
  Styled_a,
};