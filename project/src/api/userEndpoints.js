import axios from 'axios'

const API_URI = 'http://localhost:3001/api'

const queryHandler = async (call: any) => {
  try {
    const resp = await call
    return resp.data ? resp.data : resp
  } catch (e) {
    throw(e)
  }
}

/*
 * Creates a new user
 */
export const createUser = (user) => {
  if (!user || !user.name) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.post(`${API_URI}/users`, user))
}

/*
 * Gets entire user list
 */
export const getUsers = () => {
  return queryHandler(axios.get(`${API_URI}/users`))
}
