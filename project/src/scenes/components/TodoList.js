import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { Button, Paper, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import {
  SceneLayout,
  TodoItem,
  EditCreateTodoItem
} from 'ui'
import { withUser, withTodos, setTodos } from 'state/actions'
import { getUserTodos, createTodo } from 'api/todoEndpoints'

const imageUrl = 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'

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

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adding: false,
      newTodo: null
    }
  }

  async componentDidMount() {
    try {
      const resp = await getUserTodos(this.props.user.id)
      this.props.dispatch(setTodos(resp))
    } catch (e) {
      
    }
  }

  addItem = () => {
    this.setState({ adding: true, newTodo: { ...newTodoDefaults } })
  }

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
      if (!this.state.showError) {
        this.toggleError()
      }
    }
  }

  handleChange = key => event => {
    this.updateEditable({
      [key]: event.target.value
    })
  }

  handleDateChange = date => {
    this.updateEditable({
      date: date.toDate()
    })
  }

  updateEditable = newVals => {
    this.setState({
      newTodo: {
        ...this.state.newTodo,
        ...newVals
      }
    })
  }

  render() {
    const { todos, user } = this.props
    const { newTodo, adding } = this.state
    return (
      <SceneLayout sideImage={imageUrl}>
        {!user.id && (
          <Redirect to="/" />
        )}
        <Paper elevation={1}>
          {todos && (
            todos.map((todo, index) => (
              <TodoItem {...todo} key={index} divider={index < todos.length - 1 || adding} />
            ))
          )}
          {adding && (
            <div>
              <EditCreateTodoItem
                name={newTodo.name}
                date={newTodo.date}
                description={newTodo.description}
                handleChange={this.handleChange}
                handleDateChange={this.handleDateChange}
              />
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </div>
          )}
          <FloatingFab onClick={this.addItem} color="primary">
            <AddIcon />
          </FloatingFab>
        </Paper>
      </SceneLayout>
    )
  }
}

export default connect()(compose(withUser, withTodos)(TodoList))