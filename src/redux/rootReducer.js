import { combineReducers } from 'redux'
import todoReducer from './todo/todoReducer'
import listReducer from './list/listReducer'

const rootReducer = combineReducers({
  todo: todoReducer,
  list: listReducer
})

export default rootReducer
