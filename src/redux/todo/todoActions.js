import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from './todoTypes'
import db from '../../components/database'

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

export const fetchTodosRequest = () => {
  return {
    type: FETCH_TODOS_REQUEST
  }
}

const fetchTodosSuccess = (todos) => {
  const todoData = {
    todos: {},
    todoIds: []
  }
  todos.forEach((todo, index) => {
    const todoId = `todo-${index}`
    todoData.todos[todoId] = todo
    todoData.todoIds.push(todoId)
  })
  return {
    type: FETCH_TODOS_SUCCESS,
    payload: todoData
  }
}

const fetchTodosFailure = (error) => {
  return {
    type: FETCH_TODOS_FAILURE,
    payload: error
  }
}

export const fetchTodos = () => {
  return async (dispatch) => {
    dispatch(fetchTodosRequest())
    try {
      const todos = await db.getAllTodos()
      dispatch(fetchTodosSuccess(todos))
    } catch (error) {
      dispatch(fetchTodosFailure(error))
    }
  }
}
