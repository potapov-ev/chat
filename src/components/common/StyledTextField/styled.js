import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  height: 100%;
  background-color: ${p => p.theme.backgroundColors.textField};
  
  .root {
    height: 100%;
    padding-left: 4px;
  }
  .underline {
    border-color: ${p => p.theme.materialBorderColor};
    ::after {
      border-color: ${p => p.theme.materialBorderColor};
    }
  }
`;

export default StyledTextField;
