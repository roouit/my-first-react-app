import {
  UPDATE_LIST,
  SET_LISTS_TO_SHOW,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE
} from './listTypes'

const initialState = {
  loading: true,
  lists: [],
  listsToShow: [],
  error: ''
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        lists: action.payload.lists,
        listsToShow: action.payload.cache.listsToShow,
        error: ''
      }
    case FETCH_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        lists: [],
        error: action.payload
      }
    case UPDATE_LIST:
      return {
        ...state,
        lists: action.payload.lists
      }
    case SET_LISTS_TO_SHOW:
      return {
        ...state,
        listsToShow: action.payload
      }
    default:
      return state
  }
}

export default listReducer
