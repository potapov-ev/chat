import React, { memo } from 'react';
import { GifIcon } from "icons";
import { StyledButton, StyledTextField } from 'components/common'

import {
  Container,
} from "./styled";

const TextForm = ({ toggleGif, sendMessage }) => {
  console.log("TextForm")

  const handleKeyUp = e => {
    const message = e.target.value;
    if (e.key === 'Enter' && message) {
      sendMessage({
        type: "TEXT",
        text: message
      });

      e.target.value = "";
    }
  };
  
  return (
    <Container>
      <StyledButton
        startIcon={<GifIcon width="12px" height="12px" />}
        onClick={toggleGif}
        borderRadius="4px 0 0 4px"
        secondary
      >
        GIF
      </StyledButton>
      <StyledTextField
        placeholder="Type message"
        onKeyUp={handleKeyUp}
        InputProps={{
          disableUnderline: true
        }}
        height="100%"
      />
    </Container>
  );
};

const MemoizedTextForm = memo(TextForm);

export default MemoizedTextForm;