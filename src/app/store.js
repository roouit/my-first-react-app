import { configureStore } from '@reduxjs/toolkit'
import listReducer from '../features/listSlice'
import tagReducer from '../features/tagSlice'

export default configureStore({
  reducer: {
    lists: listReducer,
    tags: tagReducer
  },
})