import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper
} from '@material-ui/core'

import { AccountCircle } from '@material-ui/icons'

import { SceneLayout } from 'ui'
import { setUser } from 'state/actions'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const userList = [
  {
    name: 'Harold Haroldson',
    id: 1
  }, {
    name: 'Stephanie Stephenson',
    id: 2
  }, {
    name: 'Matt Matthews',
    id: 3
  }
]

const handleClick = (user, dispatch) => {
  dispatch(setUser(user))
}

const UsersList = ({ dispatch }) => {
  return (
    <SceneLayout sideImage={imageUrl}>
      <Grid container spacing={16}>
        <Paper elevation={1}>
          <List component="nav">
            {
              userList.map(user => (
                <Link key={user.id} to={`/${user.id}/list`}>
                  <ListItem onClick={() => { handleClick(user, dispatch)}} button>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountCircle />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      {user.name}
                    </ListItemText>
                  </ListItem>
                </Link>
              )
            )}
          </List>
        </Paper>
      </Grid>
    </SceneLayout>
  )
}

export default connect()(UsersList)