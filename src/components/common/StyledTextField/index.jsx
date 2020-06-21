import React from 'react';
import StyledTextField from "./styled";

const Container = ({
  InputProps,
  ...rest
}) => {
  return (
    <StyledTextField
      InputProps={{
        ...InputProps,
        classes: {
          root: "root",
          underline: "underline",
        }
      }}
      {...rest}
    />
  );
};

export default Container;