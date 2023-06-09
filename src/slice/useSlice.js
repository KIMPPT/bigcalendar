import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
export const useSlice = createSlice({
  name: "use",
  initialState: new Date(),
  reducers: {
    next2month: (state) => {
      state=moment(state).add(2, "M");
      return new Date(state);
    },
    prev2month: (state) => {
      state=moment(state).subtract(2, "M");
      return new Date(state);
    },
  },
});
export const { next2month,prev2month } = useSlice.actions;
export default useSlice.reducer;
