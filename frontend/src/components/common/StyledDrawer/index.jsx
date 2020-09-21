import React from 'react';

import BaseStyledDrawer from "./styled";

const StyledDrawer = ({
  children,
  anchor,
  open,
  setOpen
}) => {
  return (
    <BaseStyledDrawer
      anchor={anchor}
      open={open}
      onClose={() => setOpen(false)}
      classes={{
        paper: "paper"
      }}
      /* variant
      'permanent'
| 'persistent'
| 'temporary' todo */
    >
      {children}
    </BaseStyledDrawer>
  );
};

export default StyledDrawer;