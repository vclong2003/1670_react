import "./Assets/CSS/style.css";
import "./Assets/CSS/animate.min.css";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import OrderDetail from "./Pages/OrderDetail";
import Product from "./Pages/Product";
import Console from "./Pages/Console";
import Profile from "./Pages/Profile";
import ProductDetail from "./Pages/ProductDetail";

import StandardLayout from "./Components/Layout/StandardLayout";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store";
import { fetchCurrentUser } from "./Redux/userSlice";
import { fetchCategories } from "./Redux/categorySlice";
import { fetchCartItems } from "./Redux/cartSlice";

function App() {
  const { fetchCurrentUserLoading, loggedIn } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Fetch current user and categories
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchCategories());
  }, []);

  // Fetch cart items if user logged in
  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchCartItems());
    }
  }, [loggedIn]);

  return fetchCurrentUserLoading ? (
    ""
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="singup" element={<Signup />} />
        <Route element={<StandardLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="console/*" element={<Console />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
