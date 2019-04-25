import { combineReducers } from 'redux'
import todoApp from './todoReducers'
import userApp from './userReducers'

const reducersApp = combineReducers({
  todoApp,
  userApp
})

export default reducersApp
