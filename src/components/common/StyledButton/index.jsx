import React from 'react';
import StyledButton from "./styled";

const Container = ({
  children,
  btnRef,
  secondary,
  borderRadius,
  color,
  ...rest
}) => {
  return (
    <StyledButton
      ref={btnRef}
      secondary={secondary}
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

