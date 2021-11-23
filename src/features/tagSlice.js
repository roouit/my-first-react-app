import { createSlice } from "@reduxjs/toolkit";
import { getAllTags } from "../components/database";

export const Slice = createSlice({
  name: "tag",
  initialState: {
    value: [
      "koti",
      "harrastukset",
      "työt"
    ]
  },
  reducers: {
    remove: (state, action) => {
        
    },
    add: (state, action) => {
        
    }
  }
});
export const selectTags = (state) => state.tags.value;

export const { remove, add } = Slice.actions;
export default Slice.reducer;