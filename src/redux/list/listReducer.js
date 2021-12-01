import {
  UPDATE_LIST,
  DELETE_LIST,
  FETCH_LISTS_REQUEST,
  FETCH_LISTS_SUCCESS,
  FETCH_LISTS_FAILURE
} from './listTypes'

const initialState = {
  loading: false,
  lists: [],
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
        loading: false,
        lists: action.payload,
        error: ''
      }
    case FETCH_LISTS_FAILURE:
      return {
        loading: false,
        lists: [],
        error: action.payload
      }
    case UPDATE_LIST:
      return {
        ...state,
        lists: action.payload.lists
      }
    case DELETE_LIST:
      return {
        ...state,
        lists: [...state.lists].filter((list) => list.name !== action.payload)
      }
    default: return state
  }
}

export default listReducer
