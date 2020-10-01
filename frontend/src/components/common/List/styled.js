import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledList = styled(List)`
  color: ${p => p.theme.colors.primary };
  background-color: ${p => p.theme.backgroundColors.users}; /* todo переименовать  users например на list*/
  /* background-color: red; */
  svg {
  }
`;

const StyledListItem = styled(ListItem)`  
  .primary {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;


const StyledListItemText = styled(ListItemText)`  
  .root {
    :hover {
      color: red !important;
    }
  }
`;

export {
  StyledList,
  StyledListItem,
  StyledListItemText
};