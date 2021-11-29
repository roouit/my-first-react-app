import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './todoTypes'

export const addTodo = (data) => {
  return {
    type: ADD_TODO,
    payload: {
      name: data
    }
  }
}

export const deleteTodo = (data) => {
  return {
    type: DELETE_TODO,
    payload: {
      name: data
    }
  }
}

export const editTodo = (data) => {
  return {
    type: EDIT_TODO,
    payload: {
      name: data
    }
  }
}
