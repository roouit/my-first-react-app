import {
  UPDATE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from './todoTypes'
import db from '../../components/database'
import moment from 'moment'

export const updateTodo = (newTodoState) => {
  return {
    type: UPDATE_TODO,
    payload: newTodoState
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

export const addTodo = (newText, listData) => {
  return async (dispatch) => {
    const newTodoData = {
      text: newText,
      due: null,
      list: null,
      isDone: false,
      tags: [],
      last_modified: moment().format('YYYY-MM-DDTHH:mm:ss')
    }
    const newTodo = await db.addTodo(newTodoData)
    const newListData = {
      ...listData
    }
    const keys = Object.keys(listData.todos)
    const lastTodoIdNum =
      keys.length !== 0 ? Number(keys[keys.length - 1].split('-')[1]) : -1
    const newTodoId = `todo-${lastTodoIdNum + 1}`
    newListData.todos[newTodoId] = newTodo
    newListData.lists['tehtävät'].todoIds.push(newTodoId)
    dispatch(updateTodo(newListData))
  }
}

export const deleteTodo = (id) => {
  return async (dispatch, getState) => {
    const todoState = getState().todo
    const newListData = {
      ...todoState
    }
    const todoIdToDelete = Object.keys(todoState.todos).find((key) => {
      return todoState.todos[key].id === id
    })
    delete newListData.todos[todoIdToDelete]
    newListData.lists['tehtävät'].todoIds = Object.keys(todoState.todos).filter(
      (key) => {
        return todoState.todos[key].id !== id
      }
    )
    dispatch(updateTodo(newListData))
    await db.deleteTodo(id)
  }
}

export const editTodo = (todo, tags, e) => {
  return async (dispatch, getState) => {
    const todoState = getState().todo
    const newListData = {
      ...todoState
    }
    const newTodo = await db.updateTodo({
      id: todo.id,
      text: e.target.todoText.value,
      due: e.target.todoDue.value,
      list: e.target.todoList.value,
      isDone: todo.isDone,
      tags: tags
    })
    const todoIdToEdit = Object.keys(todoState.todos).find((key) => {
      return todoState.todos[key].id === newTodo.id
    })
    newListData.todos[todoIdToEdit] = newTodo
    dispatch(updateTodo(newListData))
  }
}
