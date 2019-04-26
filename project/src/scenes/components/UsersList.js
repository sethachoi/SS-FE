import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Paper,
  Typography
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
  }, {
    name: 'Mary Mariannes',
    id: 4
  }, {
    name: 'Alex Alexanders',
    id: 5
  }, {
    name: 'James Jameson',
    id: 6
  }, {
    name: 'George Georges',
    id: 7
  }, {
    name: 'Charlene Cheryls',
    id: 8
  }, {
    name: 'Richard Dickson',
    id: 9
  }
]

const OuterPaper = styled(Paper)({
  height: '500px',
  padding: '30px',
  width: '80%'
})

const ScrollerList = styled(List)({
  maxHeight: '415px',
  overflowY: 'scroll'
})

/*
 * Just updates redux for which user is the current user
 */
const handleClick = (user, dispatch) => {
  dispatch(setUser(user))
}

const UsersList = ({ dispatch }) => {
  return (
    <SceneLayout sideImage={imageUrl} text="Welcome">
      <Grid container spacing={16}>
        <Grid item container spacing={16}>
          <Grid item xs={2} />
          <Grid item container justify="center" alignItems="center" xs={8}>
            <OuterPaper elevation={2}>
              <Typography variant="h5" align="center" gutterBottom>
                Please select a User
              </Typography>
              <Grid container spacing={16}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <Paper elevation={1}>
                    <ScrollerList component="nav">
                      {
                        userList.map((user, index) => (
                          <Link key={user.id} to={`/${user.id}/list`}>
                            <ListItem
                              onClick={() => { handleClick(user, dispatch)}}
                              button
                              divider={index < userList.length - 1}
                            >
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
                    </ScrollerList>
                  </Paper>
                </Grid>
              </Grid>
            </OuterPaper>
          </Grid>
        </Grid>
      </Grid>
    </SceneLayout>
  )
}

export default connect()(UsersList)