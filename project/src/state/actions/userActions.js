import { connect } from 'react-redux'

export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

/*
 * Gets the current state's user
 */
export const getUser = state => ({
  id: state.userApp.id,
  name: state.userApp.name
})

/*
 * Sets up a component to have user in the state via recompose
 */
export const withUser = connect(state => ({
  user: getUser(state)
}))

/*
 * Sets the current state's user
 */
export const setUser = user => ({
  type: SET_USER,
  id: user.id,
  name: user.name
})

/*
 * Unsets the current user
 */
export const unsetUser = () => ({
  type: UNSET_USER,
  id: null,
  name: null
})
