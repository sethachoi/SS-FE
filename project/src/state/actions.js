import { connect } from 'react-redux'

export const SET_USER = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export const getUser = state => ({
  id: state.id,
  name: state.name
})

export const withUser = connect(state => ({
  user: getUser(state)
}))

export const setUser = user => ({
  type: SET_USER,
  id: user.id,
  name: user.name
})

export const unsetUser = () => ({
  type: UNSET_USER,
  id: null,
  name: null
})
