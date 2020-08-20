import React from 'react'
import { List } from 'components/common'

import {
  StyledPopover,
} from "./styled";


const rules = {
  primary: "text",
  select: "text",
};

const StyledPopoverContainer = ({
  anchorEl,
  open,
  setOpen,
  list,
  handleSelect
}) => (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom"
      }}
      onClose={() => setOpen(false)}
      classes={{
        paper: "paper",
      }}
      transitionDuration={500}
    >
      <List 
        list={list}
        rules={rules}
        handleSelect={handleSelect}
        button
        divider
      />
    </StyledPopover >
  )

export default StyledPopoverContainer;