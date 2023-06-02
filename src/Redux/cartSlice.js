import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

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
  async ({ id, quantity = 1 }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(
        `${api_endpoint}/cart`,
        { productId: id, quantity: quantity },
        {
          withCredentials: true,
        }
      );

      return dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  "cart/updateItemInCart",
  async ({ id, quantity }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(
        `${api_endpoint}/cart/${id}`,
        { quantity: quantity },
        { withCredentials: true }
      );

      return dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${api_endpoint}/cart/${id}`, {
        withCredentials: true,
      });

      return dispatch(fetchCartItems());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    error: null,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default cartSlice.reducer;
