import { connect } from 'react-redux'

export const SET_TODOS = 'SET_TODOS'
export const UNSET_TODOS = 'UNSET_TODOS'

export const getTodos = state => state.todoApp.todos

export const withTodos = connect(state => ({
  todos: getTodos(state)
}))

export const setTodos = todos => ({
  type: SET_TODOS,
  todos
})

export const unsetTodos = () => ({
  type: UNSET_TODOS,
  todos: []
})
