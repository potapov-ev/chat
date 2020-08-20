import styled from "styled-components";

const Container = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
`;

const Dialog = styled.div`
  height: 100%;
  width: calc(100% - 240px);
`;

const Pashalka = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: black;

  > video {
    height: 100%;
    width: 100%;
  }
`;

export {
  Container,
  Dialog,
  Pashalka,
};