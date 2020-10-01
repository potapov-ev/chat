import React from 'react'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import {
  StyledList,
  StyledListItem,
  StyledListItemText
} from "./styled";


function Container({
  list,
  rules = null,
  handleSelect,
  Icon,
  button,
  selectedId,
  divider,
  emptyListMessage = "",
  ListItemWrapper = ({ children }) => <>{children}</>,
}) { /* todo отдельно передавать стили для listitem и т п */

  return (
    <StyledList>
      {
        !!list.length
          ?
          list.map((item, index) => (
            <ListItemWrapper
              key={index}
              id={item.id} /* todo заменить на rules */
            >
              <StyledListItem
                classes={{
                  root: "root"
                }}
                button={button}
                selected={rules?.select && item[rules.select] === selectedId}
                onClick={() => handleSelect &&
                  handleSelect(rules?.select ? item[rules.select] : item)
                }
                divider={divider && (index !== list.length - 1)}
              >
                {
                  Icon &&
                  <ListItemAvatar>
                    <Avatar>
                      <Icon
                        width="16px"
                        height="16px"
                      />
                    </Avatar>
                  </ListItemAvatar>
                }
                <StyledListItemText
                  primary={rules ? item[rules.primary] : item}
                  secondary={rules?.secondary && item[rules.secondary]}
                  classes={{
                    primary: "primary"
                  }}
                />
              </StyledListItem>
            </ListItemWrapper>
          ))
          :
          emptyListMessage
      }
    </StyledList>
  )
}

export default Container; // мемоизировать сам бог велел
