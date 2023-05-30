import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
  },
});
