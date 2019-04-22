import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import blueGrey from '@material-ui/core/colors/blueGrey'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const NavContainer = styled(Grid)({
  backgroundColor: blueGrey[400]
})

export default class NavBar extends Component {
  constructor(props: any) {
    super(props)

    this.state = { open: false }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
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
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>
                        <Link to="/">Select User</Link>
                      </MenuItem>
                      <MenuItem onClick={this.handleClose}>
                        <Link to="/list">My To-Do List</Link>
                      </MenuItem>
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