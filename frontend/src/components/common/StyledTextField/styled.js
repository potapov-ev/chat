import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  height: ${p => p.height ? p.height : "auto"};
  background-color: ${p => p.theme.backgroundColors.textField};
  
  .input_root {
    height: 100%;
    padding-left: 4px;
  }
  .input_underline {
    border-color: ${p => p.theme.materialBorderColor};
    ::after {
      border-color: ${p => p.theme.materialBorderColor};
    }
  }
  .inputLabel_focused {
    color: ${p => (p.error && "red") || p.theme.materialBorderColor} !important; 
  }
`;

export default StyledTextField;
