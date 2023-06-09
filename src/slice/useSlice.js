import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
export const useSlice = createSlice({
  name: "use",
  initialState: new Date(),
  reducers: {
    next2month: (state) => {
      return new Date(state.setMonth(state.getMonth() + 2));
    },
    prev2month: (state) => {
      return new Date(state.setMonth(state.getMonth() - 2));
    },
  },
});
export const { next2month, prev2month } = useSlice.actions;
export default useSlice.reducer;
