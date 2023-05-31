import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
  const response = await axios.get(`${api_endpoint}/cart`);
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
export default cartSlice.reducer;
