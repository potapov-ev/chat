import styled from "styled-components";

const inputGroupHeight = "40px";

const Container = styled.div`
  height: 240px;
  background-color: ${p => p.theme.backgroundColors.messages};
`;

const InputGroup = styled.div`
  height: ${inputGroupHeight};
  display: grid;
  grid-template-columns: 126px 1fr;
  align-items: end;
`;

const GifsContainer = styled.div`
  padding-top: 6px;
  padding-left: 6px;
  height: calc(100% - ${inputGroupHeight});
  overflow-y: auto;
  overflow-x: hidden;
`;

const Gif = styled.div`
  position: relative;
  margin-right: 5px;
  margin-bottom: 5px;
  height: 100px;
  display: inline-block;

  :hover {
    cursor: pointer;

    & > img {
      opacity: 0.5;
    }
    & > div {
      visibility: visible;
    }
  }
`;

const StyledImg = styled.img`
  max-height: 100%;
  width: auto;
`;

const SendGifIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: hidden;
`;

const PlaceholderContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Placeholder = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export {
  Container,
  InputGroup,
  GifsContainer,
  Gif,
  StyledImg,
  SendGifIconWrapper,
  PlaceholderContainer,
  Placeholder
};