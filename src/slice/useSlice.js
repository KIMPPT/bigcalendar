import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
export const useSlice = createSlice({
  name: "use",
  initialState: {
    nowdate:new Date(),
  nextdate:new Date()},
  reducers: {
    next2month: (state) => {
      state.nowdate=new Date(state.nowdate.setMonth(state.nowdate.getMonth()+2));
      state.nextdate=new Date(state.nextdate.setMonth(state.nextdate.getMonth()+2));
    },
    prev2month: (state) => {
      state.nowdate=new Date(state.nowdate.setMonth(state.nowdate.getMonth()-2));
      state.nextdate=new Date(state.nextdate.setMonth(state.nextdate.getMonth()-2));
    },
  },
});
export const { next2month, prev2month } = useSlice.actions;
export default useSlice.reducer;
