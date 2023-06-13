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
import Product from "./Pages/Product";
import Console from "./Pages/Console";
import Profile from "./Pages/Profile";
import ProductDetail from "./Pages/ProductDetail";

import StandardLayout from "./Components/Layout/StandardLayout";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { fetchCurrentUser } from "./Redux/userSlice";
import { fetchCategories } from "./Redux/categorySlice";

function App() {
  // Fetch current user and categories
  useEffect(() => {
    store.dispatch(fetchCurrentUser());
    store.dispatch(fetchCategories());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
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

reportWebVitals();
