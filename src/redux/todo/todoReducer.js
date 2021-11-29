import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './todoTypes'

const initialState = {
  todos: {},
  lists: {
    tehtävät: {
      id: 'tehtävät',
      title: 'All todos',
      todoIds: []
    }
  },
  listOrder: ['tehtävät']
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
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
