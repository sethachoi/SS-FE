import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import {
  ClickAwayListener,
  Grid,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { withUser, unsetUser, unsetTodos } from 'state/actions'

const MarginIconButton = styled(IconButton)({
  marginLeft: '-12px',
  marginRight: '20px'
})

class NavBar extends Component {
  constructor(props: any) {
    super(props)

    this.state = { open: false }
  }

  /*
   * Toggles the navbar's menu being open
   */
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  /*
   * Close handler for the Popper dropdown menu
   */
  handleClose = (event, action) => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    // we are going back to user select, so unset state
    if (action === 'users') {
      this.props.dispatch(unsetUser())
      this.props.dispatch(unsetTodos())
    }

    this.setState({ open: false })
  }

  /*
   * Who's list?
   */
  generateName = () => {
    return this.props.user.name ? `${this.props.user.name}'s` : 'My'
  }

  /*
   * Generates link to user's list via user id
   */
  generateLink = () => {
    return this.props.user.id ? `/${this.props.user.id}/list` : '/'
  }

  render() {
    const { open } = this.state
    return (
      <Grid container spacing={16}>
        <AppBar position="static">
          <Toolbar>
            <MarginIconButton
              buttonRef={el => {
                this.anchorEl = el
              }}
              color="inherit"
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </MarginIconButton>
            <Popper placement="top-end" open={open} anchorEl={this.anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <Link to="/">
                          <MenuItem onClick={e => this.handleClose(e, 'users')}>
                            Select User
                          </MenuItem>
                        </Link>
                        <Link to={this.generateLink()}>
                          <MenuItem onClick={e => this.handleClose(e, 'todo')}>
                            {this.generateName()} To-Do List
                          </MenuItem>
                        </Link>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <Typography variant="h6" color="inherit">
              {this.generateName()} To-Do List
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    )
  }
}

export default compose(withUser)(connect()(NavBar))