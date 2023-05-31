import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});
