import styled, { keyframes } from "styled-components";

// #region Лодер для темной темы
const DarkContainer = styled.div`
	position: relative;
	left: calc(50% - 31px);
  top: calc(50% - 50px);
	width: 100px;
	height: 100px;
	perspective: 780px;
`;

const LoadInner = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border-radius: 50%;
`;

const LoadRotateOne = keyframes`
  0% {
	  transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
	  transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
	}
`;

const LoadRotateTwo = keyframes`
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
`;

const LoadRotateThree = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
`;

const LoadInnerOne = styled(LoadInner)`
  left: 0%;
  top: 0%;
  animation: 1.15s ${LoadRotateOne} linear infinite;
  border-bottom: 3px solid #5C5EDC;
`;

const LoadInnerTwo = styled(LoadInner)`
  right: 0%;
  top: 0%;
  animation: 1.15s ${LoadRotateTwo} linear infinite;
  border-right: 3px solid rgba(76, 70, 101, 0.99);
`;

const LoadInnerThree = styled(LoadInner)`
  right: 0%;
  bottom: 0%;
  animation: 1.15s ${LoadRotateThree} linear infinite;
  border-top: 3px solid rgb(233, 144, 138);
`;

//#endregion

// #region Лодер для светлой темы
const LightContainer = styled.div`
  width:200px;
  height:60px;
  position: relative;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
`;

const circle = keyframes`
  0% {
    top:60px;
    height:5px;
    border-radius: 50px 50px 25px 25px;
    transform: scaleX(1.7);
  }
  40% {
    height:20px;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top:0%;
  }
`;

const Circle = styled.div`
  width:20px;
  height:20px;
  position: absolute;
  border-radius: 50%;
  background-color: #e1e2e4;
  left:15%;
  transform-origin: 50%;
  animation: ${circle} .2s alternate infinite ease;

  :nth-child(2) {
    left:45%;
    animation-delay: .2s;
  }

  :nth-child(3){
    left:auto;
    right:15%;
    animation-delay: .3s;
  }
`;

const shadow = keyframes`
  0% {
    transform: scaleX(1.5);
  }
  40% {
    transform: scaleX(1);
    opacity: .7;
  }
  100% {
    transform: scaleX(.2);
    opacity: .4;
  }
`;

const Shadow = styled.div`
  width:20px;
  height:4px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top:62px;
  transform-origin: 50%;
  z-index: -1;
  left:15%;
  filter: blur(1px);
  animation: ${shadow} .5s alternate infinite ease;

  :nth-child(4){
    left: 45%;
    animation-delay: .2s;
  }

  :nth-child(5){
    left:auto;
    right:15%;
    animation-delay: .3s;
  }
`;
// #endregion

export {
  DarkContainer,
  LoadInnerOne,
  LoadInnerTwo,
  LoadInnerThree,

  LightContainer,
  Circle,
  Shadow,
};