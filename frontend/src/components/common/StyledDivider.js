import React from 'react'
import Divider from '@material-ui/core/Divider';
import styled from "styled-components";

const StyledDivider = ({
  height
}) => (
    <SCDivider
      classes={{
        root: "root"
      }}
    />
);

export default StyledDivider;

const SCDivider = styled(Divider)`
  &.root {
  }
`;