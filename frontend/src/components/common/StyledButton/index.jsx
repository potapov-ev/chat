import React from 'react';
import StyledButton from "./styled";

const Container = ({
  children,
  btnRef,
  borderRadius,
  color,
  ...rest
}) => {
  return (
    <StyledButton
      ref={btnRef}
      borderRadius={borderRadius}
      color={color}
      classes={{
        root: "root"
      }}
      {...rest}
    >
      { children }
    </StyledButton>
  );
};

export default Container;

