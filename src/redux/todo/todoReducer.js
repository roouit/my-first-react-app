import {
  UPDATE_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from './todoTypes'

const initialState = {
  loading: true,
  todos: {},
  lists: {
    all: {
      id: 'all',
      todoIds: []
    }
  },
  listOrder: ['all'],
  error: ''
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        lists: action.payload.lists,
        listOrder: action.payload.listOrder,
        error: ''
      }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        todos: {},
        error: action.payload
      }
    case UPDATE_TODO:
      return action.payload
    default:
      return state
  }
}

export default listReducer
