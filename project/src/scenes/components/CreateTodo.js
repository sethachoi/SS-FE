import React, { Component } from 'react'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import {
  Fab,
  Paper,
  TextField,
  Grid,
  Snackbar,
  Button,
  IconButton
} from '@material-ui/core'
import { DatePicker } from 'material-ui-pickers'
import AddIcon from '@material-ui/icons/Add'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

import { SceneLayout } from 'ui'
import { withUser } from 'state/actions'
import { createTodo } from 'api/todoEndpoints'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const ErrorWrapper = styled.span({
  display: 'flex',
  alignItems: 'center'
})

const ErrorText = styled.span({
  margin: '0 16px'
})

class CreateTodo extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      name: '',
      description: '',
      date: null,
      completed: false,
      showError: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleDateChange = date => {
    this.setState({
      date: date.toDate()
    })
  }

  handleSubmit = async () => {
    console.log(this.state)
    const newTodo = {
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
      completed: false
    }
    try {
      const response = await createTodo(this.props.user.id, newTodo)
      console.log(response)
    } catch (e) {
      if (!this.state.showError) {
        this.toggleError()
      }
    }
  }

  toggleError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      showError: !this.state.showError
    })
  }

  render() {
    return (
      <SceneLayout sideImage={imageUrl}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={this.toggleError}
          message={<ErrorWrapper><WarningIcon /><ErrorText>We ran into an error saving your Task</ErrorText></ErrorWrapper>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.toggleError}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        {!this.props.user.id && (
          <Redirect to="/" />
        )}
        <div>
          <p>Let's Create a New Task</p>
          <Paper elevation={1}>
            <Grid container spacing={16}>
              <Grid item xs={4}>
                <TextField
                  label="Task Name"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  margin="normal"
                  label="Date"
                  value={this.state.date}
                  onChange={this.handleDateChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  multiline
                  rows="4"
                  label="Description"
                  value={this.state.description}
                  onChange={this.handleChange('description')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Fab color="primary" onClick={this.handleSubmit}>
                  <AddIcon />
                </Fab>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </SceneLayout>
    )
  }
}

export default compose(withUser)(CreateTodo)