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

const fetchTodosSuccess = (todos, lists) => {
  const todoData = {
    todos: {},
    lists: {
      all: {
        id: 'all',
        todoIds: []
      }
    }
  }
  lists.forEach((list) => {
    todoData.lists[list.name.toLowerCase()] = {
      id: list.name,
      todoIds: []
    }
  })
  todos.forEach((todo, index) => {
    const todoId = `todo-${index}`
    todoData.todos[todoId] = todo
    Object.keys(todoData.lists).forEach(listName => {
      if (todo.list !== null) {
        if (listName === todo.list.toLowerCase()) {
          todoData.lists[listName].todoIds.push(todoId)
        }
      }
    })
    todoData.lists.all.todoIds.push(todoId)
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
      const lists = await db.getAllLists()
      dispatch(
        fetchTodosSuccess(todos, lists)
      )
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
    const currentState = getState().todo
    const newState = {
      ...currentState
    }
    const newTodo = await db.updateTodo({
      id: todo.id,
      text: e.target.todoText.value,
      due: e.target.todoDue.value,
      list: e.target.todoList.value,
      isDone: todo.isDone,
      tags: tags
    })
    const todoIdToEdit = Object.keys(currentState.todos).find((todoId) => {
      return currentState.todos[todoId].id === newTodo.id
    })
    if (newTodo.list !== todo.list) {
      newState.lists[newTodo.list].todoIds.push(todoIdToEdit)
      const indexToDel = newState.lists[todo.list].todoIds.indexOf(todoIdToEdit)
      newState.lists[todo.list].todoIds.splice(indexToDel, 1)
    }
    newState.todos[todoIdToEdit] = newTodo
    dispatch(updateTodo(newState))
  }
}
