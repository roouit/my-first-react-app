import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from './todoTypes'

const initialState = {
  loading: false,
  todos: {},
  lists: {
    tehtävät: {
      id: 'tehtävät',
      title: 'All todos',
      todoIds: []
    }
  },
  listOrder: ['tehtävät'],
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
        lists: {
          ...state.lists,
          tehtävät: {
            ...state.lists.tehtävät,
            todoIds: action.payload.todoIds
          }
        },
        error: ''
      }
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        todos: {},
        error: action.payload
      }
    case ADD_TODO:
      return {
        ...state
        // ADD
      }
    case DELETE_TODO:
      return {
        ...state
        // DELETE
      }
    case EDIT_TODO:
      return {
        ...state
        // EDIT
      }
    default:
      return state
  }
}

export default listReducer
