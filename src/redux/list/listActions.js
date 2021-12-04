import {
  UPDATE_LIST,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE
} from './listTypes'
import db from '../../components/database'
import { updateTodoLists } from '../../redux'

export const fetchListsRequest = () => {
  return {
    type: FETCH_LISTS_REQUEST
  }
}

const fetchListsSuccess = (lists) => {
  return {
    type: FETCH_LISTS_SUCCESS,
    payload: lists
  }
}

const fetchListsFailure = (error) => {
  return {
    type: FETCH_LISTS_FAILURE,
    payload: error
  }
}

export const updateList = (lists) => {
  return {
    type: UPDATE_LIST,
    payload: lists
  }
}

export const fetchLists = () => {
  return async (dispatch) => {
    dispatch(fetchListsRequest())
    try {
      const lists = await db.getAllLists()
      dispatch(fetchListsSuccess(lists))
    } catch (error) {
      dispatch(fetchListsFailure(error))
    }
  }
}

export const addList = (newList) => {
  return async (dispatch, getState) => {
    const listState = getState().list
    const newListState = {
      ...listState
    }
    const newListObject = await db.addList({
      name: newList
    })
    newListState.lists.push(newListObject)
    dispatch(updateList(newListState))
  }
}

export const editList = (oldListName, newListName) => {
  return async (dispatch, getState) => {
    const listState = getState().list
    const newListState = {
      ...listState
    }
    const updatedList = {
      name: newListName
    }
    newListState.lists.forEach((listItem, index) => {
      if (listItem.name === oldListName) {
        updatedList.id = listItem.id
        newListState.lists[index].name = newListName
      }
    })
    await db.updateList(updatedList)
    dispatch(updateTodoLists(oldListName, newListName))
    dispatch(updateList(newListState))
  }
}

export const deleteList = (listName) => {
  return async (dispatch, getState) => {
    const currentState = getState().list
    const listItemToDel = currentState.lists.find(
      (listItem) => listItem.name === listName
    )
    const newState = {
      ...currentState,
      lists: currentState.lists.filter(
        (list) => list.name !== listItemToDel.name
      )
    }
    await db.deleteList(listItemToDel.id)
    dispatch(updateTodoLists(listName, null))
    dispatch(updateList(newState))
  }
}
