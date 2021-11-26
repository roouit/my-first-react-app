import { ADD_LIST } from './listTypes'

const initialState = {
  lists: [
    {
      name: 'Opiskelujutut'
    },
    {
      name: 'Työhommat'
    }
  ]
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      }
    default: return state
  }
}

export default listReducer
