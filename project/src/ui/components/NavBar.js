import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import blueGrey from '@material-ui/core/colors/blueGrey'

import {
  ClickAwayListener,
  Grid,
  Grow,
  Paper,
  Popper,
  Button,
  MenuItem,
  MenuList
} from '@material-ui/core'

import { withUser, unsetUser } from 'state/actions'

const NavContainer = styled(Grid)({
  backgroundColor: blueGrey[400]
})

class NavBar extends Component {
  constructor(props: any) {
    super(props)

    this.state = { open: false }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = (event, action) => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    // we are going back to user select
    if (action === 'users') {
      this.props.dispatch(unsetUser())
    }

    this.setState({ open: false })
  }

  generateName = () => {
    return this.props.user.name ? `${this.props.user.name}'s` : 'My'
  }

  generateLink = () => {
    return this.props.user.id ? `/${this.props.user.id}/list` : '/'
  }

  render() {
    const { open } = this.state
    return (
      <NavContainer container spacing={16}>
        <Grid item xs={11} />
        <Grid item>
          <Button
            buttonRef={el => {
              this.anchorEl = el
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            Menu
          </Button>
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
        </Grid>
      </NavContainer>
    )
  }
}

export default compose(withUser)(connect()(NavBar))