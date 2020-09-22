import styled from "styled-components";
import Drawer from '@material-ui/core/Drawer';

const StyledDrawer = styled(Drawer)`
  .paper {
    width: 240px;
    background-color: ${p => p.theme.backgroundColors.users} /* todo переименовать  users например на list*/
  } 
`;

export default StyledDrawer; // todo привести общие компоненты к общей структуре