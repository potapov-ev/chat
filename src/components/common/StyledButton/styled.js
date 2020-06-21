import styled from "styled-components";
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
  padding: 0 14px;
  height: 100%;
  background-color: ${p => p.color ? p.color : p.theme.backgroundColors.button + "!important"};
  color: ${p => p.color ? p.color : p.theme.colors.secondary + "!important"};

  svg {
    fill: ${p => p.theme.colors.secondary};
  }

  &.root {
    border-radius: ${p => p.borderRadius ? p.borderRadius : "4px"};
  }
`;

export default StyledButton;