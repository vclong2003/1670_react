import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const productsSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    items: [],
    selectedItem: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });

    // Fetch product by id
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedItem = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ category, search }) => {
    const response = await axios.get(
      `${api_endpoint}/product/?category=${category || ""}&search=${
        search || ""
      }`
    );
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/product/${id}`);
    return response.data;
  }
);

export default productsSlice.reducer;
