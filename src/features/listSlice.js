import { createSlice } from '@reduxjs/toolkit'

export const Slice = createSlice({
  name: 'list',
  initialState: {
    value: [{
      id: 1,
      name: 'Opiskelujutut'
    },
    {
      id: 2,
      name: 'Työasiat'
    }]
  },
  reducers: {
    remove: (state, action) => {

    },
    add: (state, action) => {

    }
  }
})
export const selectLists = (state) => state.lists.value

export const { remove, add } = Slice.actions
export default Slice.reducer
