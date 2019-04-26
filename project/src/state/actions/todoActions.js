import { connect } from 'react-redux'

export const SET_TODOS = 'SET_TODOS'
export const UNSET_TODOS = 'UNSET_TODOS'

/*
 * Gets the current state's todos
 */
export const getTodos = state => state.todoApp.todos

/*
 * Sets up a component with todos in the state via recompose
 */
export const withTodos = connect(state => ({
  todos: getTodos(state)
}))

/*
 * Action to set current Todos array
 */
export const setTodos = todos => ({
  type: SET_TODOS,
  todos
})

/*
 * Action to unset current Todos, ie switching users
 */
export const unsetTodos = () => ({
  type: UNSET_TODOS,
  todos: []
})
