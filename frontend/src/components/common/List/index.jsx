import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import StyledList from "./styled"
function Container({
  list,
  rules = null,
  handleSelect,
  Icon,
  button,
  divider,
  emptyListMessage = ""
}) {
  return (
    <StyledList>
      {
        !!list.length
          ?
          list.map((item, index) => (
            <ListItem
              button={button}
              onClick={() => { handleSelect && handleSelect(item[rules.select]) }}
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
              <ListItemText
                primary={rules ? item[rules.primary] : item}
                secondary={rules && item[rules.secondary]}
              />
            </ListItem>
          ))
          :
          emptyListMessage
      }
    </StyledList>
  )
}

export default Container
