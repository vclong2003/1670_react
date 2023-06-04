import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import addressReducer from "./addressSlice";
import staffReducer from "./staffSlice";
import orderReducer from "./orderSlice";
export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    category: categoryReducer,
    cart: cartReducer,
    address: addressReducer,
    staff: staffReducer,
    order: orderReducer,
  },
});
