import styled from "styled-components";

const Container = styled.div`
  align-self: ${p => p.isMy ? "flex-end" : "flex-start"};
  max-width: 60%;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 10px;
  color: ${p => p.isMy ? p.theme.colors.secondary : p.theme.colors.primary };
  background-color: ${p => p.isMy ? p.theme.backgroundColors.myMessage : p.theme.backgroundColors.message};

  & span {
    color: ${p => p.isMy ? p.theme.colors.myMessageTime : p.theme.colors.messageTime}
  }
`;

const UserName = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
`;

const Time = styled.span`
  margin-left: 8px;
  font-size: 10px;
`;

const Text = styled.div`
  margin-top: 4px;
  max-width: 100%;
  line-height: 1.4;
  word-wrap: break-word;
`;

const ImgContainer = styled.div`
  padding-top: 4px;
`;

export {
  Container,
  UserName,
  Time,
  Text,
  ImgContainer,
};
