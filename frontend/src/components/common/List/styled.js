import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const StyledList = styled(List)`
  color: ${p => p.theme.colors.primary };
  background-color: ${p => p.theme.backgroundColors.users}; /* todo переименовать  users например на list*/
  /* background-color: red; */
  svg {
  }
`;

const StyledListItemText = styled(ListItemText)`  
  .primary {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;

export {
  StyledList,
  StyledListItemText
};