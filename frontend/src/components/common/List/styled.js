import styled from "styled-components";
import List from '@material-ui/core/List';

const StyledList = styled(List)`
  color: white;

  svg {
    fill: ${p => p.theme.colors.primary};
  }
`;

export default StyledList;