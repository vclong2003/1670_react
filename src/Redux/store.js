import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./productSlice";

export default configureStore({
  reducer: { product: useReducer },
});
