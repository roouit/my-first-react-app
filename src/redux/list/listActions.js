import { ADD_LIST } from './listTypes'

export const addList = (data) => {
  return {
    type: ADD_LIST,
    payload: {
      name: data
    }
  }
}
