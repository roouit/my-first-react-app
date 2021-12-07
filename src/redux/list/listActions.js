import {
  UPDATE_LIST,
  SET_LISTS_TO_SHOW,
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

const fetchListsSuccess = (lists, cache) => {
  return {
    type: FETCH_LISTS_SUCCESS,
    payload: {
      lists: lists,
      cache: cache[0]
    }
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

export const setListsToShow = (newLists) => {
  return {
    type: SET_LISTS_TO_SHOW,
    payload: newLists
  }
}

export const fetchLists = () => {
  return async (dispatch) => {
    dispatch(fetchListsRequest())
    try {
      const lists = await db.getAllLists()
      const cache = await db.getCachedData()
      dispatch(fetchListsSuccess(lists, cache))
    } catch (error) {
      dispatch(fetchListsFailure(error))
    }
  }
}

export const addList = (newList) => {
  return async (dispatch, getState) => {
    const currentState = getState().list
    const newState = {
      ...currentState
    }
    const newListObject = await db.addList({
      name: newList
    })
    newState.lists.push(newListObject)
    dispatch(updateTodoLists(null, newList))
    dispatch(updateList(newState))
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
    if (newListState.listsToShow.includes(oldListName)) {
      const index = newListState.listsToShow.indexOf(oldListName)
      newListState.listsToShow[index] = newListName
    }
    await db.updateList(updatedList)
    await db.updateCacheListsToShow(newListState.listsToShow)
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
    if (newState.listsToShow.includes(listName)) {
      const index = newState.listsToShow.indexOf(listName)
      newState.listsToShow.splice(index, 1)
    }
    await db.deleteList(listItemToDel.id)
    await db.updateCacheListsToShow(newState.listsToShow)
    dispatch(updateTodoLists(listName, null))
    dispatch(updateList(newState))
  }
}
