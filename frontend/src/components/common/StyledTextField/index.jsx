import React from 'react';
import StyledTextField from "./styled";

const Container = ({
  input,
  meta: { touched, error } = {},
  InputProps,
  ...rest
}) => {
  return (
    <StyledTextField
      {...input}
      error={touched && error}
      helperText={touched && error}
      InputProps={{
        ...InputProps,
        classes: {
          root: "input_root",
          underline: "input_underline",
        }
      }}
      InputLabelProps={{
        classes: {
          focused: "inputLabel_focused"
        }
      }}
      {...rest}
    />
  );
};

export default Container;