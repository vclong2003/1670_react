import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get(`${api_endpoint}/cart`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ id, quantity = 1 }, { dispatch }) => {
    const response = await axios.post(
      `${api_endpoint}/cart`,
      { productId: id, quantity: quantity },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      dispatch(fetchCartItems());
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  "cart/updateItemInCart",
  async ({ id, quantity }, { dispatch }) => {
    const response = await axios.put(
      `${api_endpoint}/cart/${id}`,
      { quantity: quantity },
      { withCredentials: true }
    );

    if (response.status === 200) {
      dispatch(fetchCartItems());
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id, { dispatch }) => {
    const response = await axios.delete(`${api_endpoint}/cart/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(fetchCartItems());
    }
  }
);

export default cartSlice.reducer;
