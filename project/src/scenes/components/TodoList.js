import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import {
  Button,
  Paper,
  Fab,
  Grid,
  Typography,
  List,
  ListItem
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ScheduleIcon from '@material-ui/icons/Schedule'

import {
  SceneLayout,
  TodoItem,
  EditCreateTodoItem,
  ErrorSnackbar
} from 'ui'
import { withUser, withTodos, setTodos } from 'state/actions'
import { getUserTodos, createTodo } from 'api/todoEndpoints'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

const StyledListItem = styled(ListItem)({
  alignItems: 'flex-end !important'
})

const FloatingFab = styled(Fab)({
  position: 'absolute !important',
  bottom: '32px',
  right: '32px'
})

const newTodoDefaults = {
  name: '',
  description: '',
  date: null
}

const PaddedIcon = styled(ScheduleIcon)({
  paddingBottom: '16px'
})

const NoTasksContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px'
})

const ScrollerList = styled(List)({
  maxHeight: '400px',
  overflowY: 'scroll',
  maxWidth: '800px'
})

const ScrollerPaper = styled(Paper)({
  height: 'fit-content'
})

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      newTodo: null,
      showError: false,
      errorMessage: ''
    }
  }

  /*
   * Upon first load, fetches this user's todos by ID
   */
  async componentDidMount() {
    try {
      const resp = await getUserTodos(this.props.user.id)
      this.props.dispatch(setTodos(resp))
    } catch (e) {
      this.setState({
        showError: true,
        errorMessage: 'Sorry! We ran into some problems fetching your Todo List.'
      })
    }
  }

  /*
   * Toggles the error popup
   */
  toggleError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({
      showError: !this.state.showError
    })
  }

  /*
   * Sets up state to create a new Todo item
   */
  addItem = () => {
    this.setState({ adding: true, newTodo: { ...newTodoDefaults } })
  }

  /*
   * Cancels the adding process for a new Todo item
   */
  cancel = () => {
    this.setState({
      adding: false
    })
  }

  /*
   * Submits a a Todo for creation for this owner
   */
  handleSubmit = async () => {
    const newTodo = {
      ...this.state.newTodo,
      completed: false
    }

    try {
      const response = await createTodo(this.props.user.id, newTodo)
      const newTodos = [...this.props.todos, response]
      this.props.dispatch(setTodos(newTodos))
      this.setState({
        adding: false
      })
    } catch (e) {
      this.setState({
        showError: true,
        errorMessage: 'Sorry! We ran into some problems adding to your Todo List.'
      })
    }
  }

  /*
   * Updates the keys for the new Todo
   */
  handleChange = key => event => {
    this.updateEditable({
      [key]: event.target.value
    })
  }

  /*
   * Updates the date in particular to a js date format
   */
  handleDateChange = date => {
    this.updateEditable({
      date: date.toDate()
    })
  }

  /*
   * All in one function for updating the keys for the new Todo
   */
  updateEditable = newVals => {
    this.setState({
      newTodo: {
        ...this.state.newTodo,
        ...newVals
      }
    })
  }

  /*
   * Just kinda tells you what day it is
   */
  generateSubtext = () => {
    return moment().format('dddd, MMMM Do YYYY')
  }

  render() {
    const { todos, user } = this.props
    const {
      newTodo,
      adding,
      showError,
      errorMessage 
    } = this.state

    return (
      <SceneLayout sideImage={imageUrl} text="My Day" subtext={this.generateSubtext()}>
        <ErrorSnackbar
          show={showError}
          toggleError={this.toggleError}
          errorMessage={errorMessage}
        />
        {!user.id && (
          <Redirect to="/" />
        )}
        <Grid container spacing={16} justify="center" alignItems="center" direction="column">
          <Typography variant="h5" gutterBottom>
            Your To-Dos
          </Typography>
          <ScrollerPaper elevation={2}>
            <ScrollerList>
            {todos && (
              todos.map((todo, index) => (
                <TodoItem {...todo} index={index} key={index} divider={index < todos.length - 1 || adding} />
              ))
            )}
            </ScrollerList>
            {todos && !todos.length && (
              <NoTasksContainer>
                <PaddedIcon />
                <Typography variant="h5">Looks like you have no tasks</Typography>
                <Typography variant="subtitle1">How about adding a new one?</Typography>
              </NoTasksContainer>
            )}
            {adding && (
              <StyledListItem>
                <EditCreateTodoItem
                  name={newTodo.name}
                  date={newTodo.date}
                  description={newTodo.description}
                  handleChange={this.handleChange}
                  handleDateChange={this.handleDateChange}
                />
                <Button color="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={this.cancel}>
                  Cancel
                </Button>
              </StyledListItem>
            )}
          </ScrollerPaper>
        </Grid>
        <FloatingFab onClick={this.addItem} color="primary" disabled={adding}>
          <AddIcon />
        </FloatingFab>
      </SceneLayout>
    )
  }
}

export default connect()(compose(withUser, withTodos)(TodoList))