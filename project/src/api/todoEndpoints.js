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
 * Creates a new Todo item attached to the owner id
 */
export const createTodo = (ownerId, todo) => {
  if (!ownerId || !todo) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.post(`${API_URI}/${ownerId}/todos/create`, todo))
}

/*
 * Gets all the Todos for a particular user ID
 */
export const getUserTodos = (ownerId) => {
  if (!ownerId) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.get(`${API_URI}/${ownerId}/todos`))
}

/*
 * Gets a specific Todo by the id
 */
export const getTodoById = (id) => {
  if (!id) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.get(`${API_URI}/todos/${id}`))
}

/*
 * Deletes a specific Todo
 */
export const deleteTodo = (id) => {
  if (!id) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.delete(`${API_URI}/todos/${id}`))
}

/*
 * Updates a specific Todo
 */
export const updateTodo = (id, todo) => {
  if (!id || !todo) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.post(`${API_URI}/todos/update/${id}`, todo))
}