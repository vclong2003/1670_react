import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://6465a7439c09d77a62f094da.mockapi.io/book?skip=30"
    );
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;

      console.log("items loaded");
    });
  },
});

export default productsSlice.reducer;
