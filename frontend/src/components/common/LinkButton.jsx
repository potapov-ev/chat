import React from "react";
import { withRouter } from 'react-router-dom';

import StyledButton from "./StyledButton";

const LinkButton = ({
  children,
  path,
  href,
  history,
  callback
}) => {
  const handleClick = () => {
    callback();
    if (href) {
      window.location.href = href;
    } else {
      history.push(path);
    }
  };

  return (
    <StyledButton
      color="inherit"
      borderRadius="0"
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  )
};

export default withRouter(LinkButton);