import { SET_TODOS, UNSET_TODOS } from '../actions/todoActions'

const todoApp = ( state = { todos: [] }, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { todos: [...action.todos] }
    case UNSET_TODOS:
      return { todos: [...action.todos] }
    default:
      return state
  }
}

export default todoApp