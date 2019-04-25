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

export const createTodo = (ownerId, todo) => {
  if (!ownerId || !todo) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.post(`${API_URI}/${ownerId}/todos/create`, todo))
}

export const getUserTodos = (ownerId) => {
  if (!ownerId) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.get(`${API_URI}/${ownerId}/todos`))
}

export const getTodoById = (id) => {
  if (!id) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.get(`${API_URI}/todos/${id}`))
}

export const deleteTodo = (id) => {
  if (!id) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.delete(`${API_URI}/todos/${id}`))
}

export const updateTodo = (id, todo) => {
  if (!id || !todo) {
    throw(new Error('Invalid inputs'))
  }
  return queryHandler(axios.post(`${API_URI}/todos/update/${id}`, todo))
}