import {
  UPDATE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from './todoTypes'
import db from '../../components/database'
import moment from 'moment'

export const updateTodoState = (newTodoState) => {
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

const fetchTodosSuccess = (todos, lists, cache) => {
  const todoData = {
    todos: {},
    lists: cache[1].lists,
    listOrder: ['all']
  }
  lists.forEach((list) => {
    todoData.listOrder.push(list.name)
  })
  todos.forEach((todo, index) => {
    const todoId = `todo-${index}`
    todoData.todos[todoId] = todo
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
      const cache = await db.getCachedData()
      dispatch(
        fetchTodosSuccess(todos, lists, cache)
      )
    } catch (error) {
      dispatch(fetchTodosFailure(error))
    }
  }
}

export const updateTodo = (newTodoState) => {
  return async (dispatch, getState) => {
    await db.updateCacheLists(newTodoState.lists)
    dispatch(updateTodoState(newTodoState))
  }
}

export const updateNotified = (newTodoState, todo) => {
  return async (dispatch, getState) => {
    await db.updateTodo(todo)
    dispatch(updateTodoState(newTodoState))
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
      last_modified: moment().format('YYYY-MM-DDTHH:mm:ss'),
      notified: false
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
    newListData.lists.all.todoIds.push(newTodoId)
    await db.updateCacheLists(newListData.lists)
    dispatch(updateTodoState(newListData))
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
    const listToModify = todoState.todos[todoIdToDelete].list

    if (listToModify) {
      newListData.lists[listToModify].todoIds = newListData.lists[
        listToModify
      ].todoIds.filter((key) => {
        return todoState.todos[key].id !== id
      })
    }

    newListData.lists.all.todoIds = newListData.lists.all.todoIds.filter((key) => {
      return todoState.todos[key].id !== id
    })
    delete newListData.todos[todoIdToDelete]
    dispatch(updateTodoState(newListData))
    await db.deleteTodo(id)
    await db.updateCacheLists(newListData.lists)
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
      list: e.target.todoList.value === 'empty' ? null : e.target.todoList.value,
      isDone: todo.isDone,
      tags: tags,
      notified: todo.notified
    })
    const todoIdToEdit = Object.keys(currentState.todos).find((todoId) => {
      return currentState.todos[todoId].id === newTodo.id
    })
    if (newTodo.list !== todo.list) {
      if (newTodo.list !== null) {
        newState.lists[newTodo.list].todoIds.push(todoIdToEdit)
      }
      if (todo.list !== null) {
        const indexToDel =
          newState.lists[todo.list].todoIds.indexOf(todoIdToEdit)
        newState.lists[todo.list].todoIds.splice(indexToDel, 1)
      }
      await db.updateCacheLists(newState.lists)
    }
    newState.todos[todoIdToEdit] = newTodo
    dispatch(updateTodoState(newState))
  }
}

export const updateTodoLists = (oldListName, newListName) => {
  return async (dispatch, getState) => {
    const currentState = getState().todo
    const newState = {
      ...currentState
    }
    if (oldListName === null) {
      newState.lists[newListName] = {
        id: newListName,
        todoIds: []
      }
      newState.listOrder.push(newListName)
    } else {
      Object.keys(currentState.todos).forEach(async (todoId) => {
        const todo = {
          ...currentState.todos[todoId]
        }
        if (todo.list === oldListName) {
          newState.todos[todoId].list = newListName
          await db.updateTodo({
            ...todo,
            list: newListName
          })
        }
      })
      if (newListName !== null) {
        newState.lists[newListName] = {
          ...newState.lists[oldListName],
          id: newListName
        }
      }
      const indexToMod = newState.listOrder.indexOf(oldListName)
      if (newListName === null) {
        newState.listOrder.splice(indexToMod, 1)
      } else {
        newState.listOrder[indexToMod] = newListName
      }

      delete newState.lists[oldListName]
    }
    await db.updateCacheLists(newState.lists)
    dispatch(updateTodoState(newState))
  }
}
