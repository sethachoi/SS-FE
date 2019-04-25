import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import moment from 'moment'
import styled from 'styled-components'

import {
  Checkbox,
  ListItem,
  ListItemText,
  Button,
  Typography
} from '@material-ui/core'

import { setTodos, withTodos } from 'state/actions'
import { updateTodo, deleteTodo } from 'api/todoEndpoints'
import { EditCreateTodoItem } from 'ui'

const TODO_KEYS = [
  '_id',
  'completed',
  'date',
  'description',
  'name',
  'owner'
]

type Props = {
  _id: String,
  completed: Boolean,
  date: String,
  description: String,
  dispatch: any,
  name: any,
  owner: number,
  todos: any,
  key: number,
  divider: Boolean
}

const DateText = styled(Typography)({
  minWidth: '30%'
})

const TodoInfo = styled.div({
  display: 'flex',
  minWidth: '50%',
  justifyContent: 'space-between',
  alignItems: 'center'
})

class TodoItem extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      editing: false,
      todo: pick(props, TODO_KEYS)
    }
  }

  generateName(name) {
    if (!this.props.completed) {
      return name
    }
    return (
      <del>
        { name }
      </del>
    )
  }

  generateDateText(date) {
    if (!date) {
      return
    }
    return (
      <DateText variant="subtitle1">
        { moment(date).format('dddd, MMMM Do YYYY') }
      </DateText>
    )
  }

  handleDelete = async () => {
    const { todos, dispatch, _id } = this.props
    try {
      await deleteTodo(_id)
      let newTodos = todos.filter(el => el._id !== _id)
      dispatch(setTodos(newTodos))
    } catch (e) {

    }
  }

  handleCheck = async () => {
    const { todos, dispatch, key, ...others } = this.props
    const todoProperties = pick(others, TODO_KEYS)
    const newTodo = {...todoProperties, completed: !todoProperties.completed }
    try {
      await updateTodo(newTodo._id, newTodo)
      let newTodos = [...todos]
      newTodos[key] = newTodo
      dispatch(setTodos(newTodos))
    } catch (e) {

    }
  }

  handleSubmit = async () => {
    const { key, todos, dispatch } = this.props
    const { todo } = this.state
    try {
      await updateTodo(todo._id, todo)
      let newTodos = [...todos]
      newTodos[key] = todo
      dispatch(setTodos(newTodos))
      this.toggleEdit()
    } catch (e) {

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
      todo: {
        ...this.state.todo,
        ...newVals
      }
    })
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { completed, name, date, description, divider } = this.props
    const { todo, editing } = this.state

    if (!editing) {
      return (
        <ListItem divider={divider}>
          <Checkbox checked={completed} onClick={this.handleCheck} />
          <ListItemText primary={this.generateName(name)} secondary={description} />
          <TodoInfo>
            <div />
              { this.generateDateText(date) }
              <div>
              <Button color="primary" onClick={this.toggleEdit}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={this.handleDelete}>
                Delete
              </Button>
            </div>
          </TodoInfo>
        </ListItem>
      )
    }

    return (
      <ListItem>
        <EditCreateTodoItem
          name={todo.name}
          date={todo.date}
          description={todo.description}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
        />
        <Button color="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </ListItem>
    )
  }
}

export default compose(withTodos)(connect()(TodoItem))
