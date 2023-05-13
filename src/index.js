import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BookDetail from "./Pages/BookDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import MyOrders from "./Pages/MyOrders";
import OrderDetail from "./Pages/OrderDetail";
import Products from "./Pages/Products";
import Stores from "./Pages/Stores";
import Console from "./Pages/Console";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="1" element={<BookDetail />} />
        <Route path="2" element={<Cart />} />
        <Route path="3" element={<Checkout />} />
        <Route path="4" element={<Signin />} />
        <Route path="5" element={<Signup />} />
        <Route path="6" element={<MyOrders />} />
        <Route path="7" element={<OrderDetail />} />
        <Route path="8" element={<Products />} />
        <Route path="9" element={<Stores />} />
        <Route path="10" element={<Console />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
