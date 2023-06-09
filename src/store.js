import { configureStore } from "@reduxjs/toolkit";
import useSlice from "./slice/useSlice";
export default configureStore({
    reducer:{use:useSlice}
})