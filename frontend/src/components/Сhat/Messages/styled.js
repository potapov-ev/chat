import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  padding: 12px;
  padding-bottom: 0;
  height: ${p => `calc(100% - ${(p.formHeight + 12) + "px"})`}; /* 12 - PaddingBlock height */
  display: flex;
  flex-direction: column;
  background-color: ${p => p.theme.backgroundColors.messages};
  overflow-y: auto;
  overflow-x: hidden;
`;

const PaddingBlock = styled.div`
  height: 12px;
  background-color: ${p => p.theme.backgroundColors.messages};
`;

const NoMessages = styled.div`
  padding: 12px;
`;

export {
  Container,
  PaddingBlock,
  NoMessages
}