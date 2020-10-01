import React, { 
  useState, 
  useContext,
  memo 
} from 'react';
import { DialogContext } from 'context/DialogContext'
import {
  List,
} from 'components/common';

import {
  SyledNavLink
} from "./styled"

const rules = {
  primary: "partnerName",
  secondary: "lastMessage",
  select: "id"
};

const DialogList = ({ 
  dialogs,
  UserIcon
}) => {
  const { currentDialogId } = useContext(DialogContext);
  const [selectedId, setSelectedId] = useState(currentDialogId);

  const ListItemWrapper = ({ id, children }) => (
    <SyledNavLink to={"/" + id}> {/* отрефачить */}
      {children}
    </SyledNavLink>
  );

  const handleSelect = dialogId => { // todo useCallback (везде)
    setSelectedId(dialogId);
  };

  // выделить хедер, чтобы дивидеры не слвались
  return (
      <List
        list={dialogs}
        Icon={UserIcon}
        rules={rules}
        handleSelect={handleSelect}
        ListItemWrapper={ListItemWrapper}
        selectedId={selectedId}
        divider
        button
      />
  );
};

const MemoizedDialogList = memo(DialogList);

export default MemoizedDialogList;