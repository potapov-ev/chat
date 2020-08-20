import styled from "styled-components";
import Paper from '@material-ui/core/Paper';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Стили для карточек регистрации и авторизации
const StyledPaper = styled(Paper)`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h3`
  padding: 24px 12px;
`;

const FieldWrapper = styled.div`
  padding: 4px;
  height: 80px;
`;

const PageSwitch = styled.div`
  padding: 4px;
  font-size: 12px;
`;

const Link = styled.span`
  padding-left: 12px;
  cursor: pointer;
  :hover {
    color: #3598db;
  }
`;

const ButtonWrapper = styled.div`
  padding: 18px;
  padding-bottom: 0px;
`;

const ErrorMessage = styled.div`
  min-height: 28px;
  padding: 6px;
  font-size: 12px;
  color: red;
`;

export {
  PageContainer,
  StyledPaper,
  Title,
  FieldWrapper,
  PageSwitch,
  Link,
  ButtonWrapper,
  ErrorMessage
};