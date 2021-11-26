import { createStore } from 'redux'
import listReducer from './list/listReducer'

const store = createStore(listReducer)

export default store
