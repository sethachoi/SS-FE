import React, { Component } from 'react'
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
  Typography,
  Fab,
  Button,
  TextField,
  Divider
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import { AccountCircle } from '@material-ui/icons'
import PeopleIcon from '@material-ui/icons/People'

import { SceneLayout } from 'ui'
import { setUser } from 'state/actions'
import { getUsers, createUser } from 'api/userEndpoints'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const OuterPaper = styled(Paper)({
  height: '500px',
  padding: '30px',
  width: '80%'
})

const ScrollerList = styled(List)({
  maxHeight: '415px',
  overflowY: 'scroll'
})

const FloatingFab = styled(Fab)({
  position: 'absolute !important',
  bottom: '32px',
  right: '32px'
})

const NoUsersContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px'
})

const PaddedIcon = styled(PeopleIcon)({
  paddingBottom: '16px'
})

/*
 * Just updates redux for which user is the current user
 */
const handleClick = (user, dispatch) => {
  const id = user._id
  dispatch(setUser({ id, name: user.name }))
}

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      loading: true,
      adding: false,
      newUserName: ''
    }
  }

  async componentDidMount(){
    try {
      const resp = await getUsers()
      this.setState({
        userList: resp || [],
        loading: false
      })
    } catch (e) {

    }
  }

  toggleAdding = () => {
    this.setState({
      adding: !this.state.adding
    })
  }

  handleSubmit = async () => {
    const { newUserName, userList } = this.state
    try {
      const newUser = {
        name: newUserName
      }
      const resp = await createUser(newUser)
      const newUserList = [...userList, resp]
      this.setState({
        userList: newUserList,
        adding: false
      })
    } catch (e) {

    }
  }

  handleChange = event => {
    this.setState({
      newUserName: event.target.value
    })
  }

  render() {
    const { dispatch } = this.props
    const { userList, loading, adding, newUserName } = this.state

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
                      {adding && (
                        <Grid container justify="center" alignItems="center" spacing={16}>
                          <Grid item sm={12}>
                            <Divider light />
                          </Grid>
                          <Grid item container justify="center" sm={12}>
                            <Typography variant="subtitle1">Add new user</Typography>
                          </Grid>
                          <Grid item container justify="center" sm={12}>
                            <TextField
                              label="Name"
                              value={newUserName}
                              onChange={this.handleChange}
                            />
                          </Grid>
                          <Grid item container justify="center" sm={12}>
                            <Button color="primary" onClick={this.handleSubmit}>
                              Submit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={this.toggleAdding}>
                              Cancel
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      <ScrollerList component="nav">
                        {
                          !loading && userList.map((user, index) => (
                            <Link key={user._id} to={`/${user._id}/list`}>
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
                      {!loading && !userList.length && (
                        <NoUsersContainer>
                          <PaddedIcon />
                          <Typography variant="h5">Looks like there are no Users</Typography>
                          <Typography variant="subtitle1">How about adding a new one?</Typography>
                        </NoUsersContainer>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </OuterPaper>
            </Grid>
          </Grid>
        </Grid>
        <FloatingFab onClick={this.toggleAdding} color="primary" disabled={adding}>
          <AddIcon />
        </FloatingFab>
      </SceneLayout>
    )
  }
}

export default connect()(UsersList)