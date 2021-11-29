import {
  ADD_LIST,
  DELETE_LIST,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE
} from './listTypes'
import db from '../../components/database'

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

export const addList = (data) => {
  return {
    type: ADD_LIST,
    payload: {
      name: data
    }
  }
}

export const deleteList = (listName) => {
  return {
    type: DELETE_LIST,
    payload: listName
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
