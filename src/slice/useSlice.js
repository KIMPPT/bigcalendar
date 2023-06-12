import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const now=new Date();
export const useSlice = createSlice({
  name: "use",
  initialState: {
    nowdate: new Date(),
    nextdate: new Date(now.setMonth(now.getMonth()+1)),
  },
  reducers: {
    next2month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() + 2)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() + 2)
      );
    },
    next1month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() + 1)
      );
    },
    prev2month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() - 2)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() - 2)
      );
    },
    prev1month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() - 1)
      );
    },
  },
});
export const { next2month, prev2month,next1month,prev1month } = useSlice.actions;
export default useSlice.reducer;
