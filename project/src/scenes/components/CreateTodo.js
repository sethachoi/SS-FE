import React, { Component } from 'react'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import {
  Fab,
  Paper,
  Grid,
  Snackbar,
  Button,
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

import { SceneLayout, EditCreateTodoItem } from 'ui'
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
    const newTodo = {
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
      completed: false
    }
    try {
      const response = await createTodo(this.props.user.id, newTodo)
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
    const { name, date, description } = this.state
    return (
      <SceneLayout sideImage={imageUrl}>

        {!this.props.user.id && (
          <Redirect to="/" />
        )}
        <div>
          <p>Let's Create a New Task</p>
          <Paper elevation={1}>
            <Grid container spacing={16}>
              <EditCreateTodoItem
                name={name}
                date={date}
                description={description}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
              />
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