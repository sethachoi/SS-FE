import { SET_USER, UNSET_USER } from '../actions/userActions'

const userApp = ( state = { id: null, name: null }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        id: action.id,
        name: action.name
      }
    case UNSET_USER:
      return {
        id: action.id,
        name: action.name
      }
    default:
      return state
  }
}

export default userApp