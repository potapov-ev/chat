import React from "react"

import StyledLink from "./styled";

const Container = ({ to, children }) => (
  <StyledLink
    to={to}
  >
    { children }
  </StyledLink>
);

export default Container;