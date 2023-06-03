import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get(`${api_endpoint}/category`);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, description }, { dispatch }) => {
    const response = await axios.post(
      `${api_endpoint}/category`,
      { name: name, description: description },
      { withCredentials: true }
    );

    dispatch(fetchCategories());
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ name, description }, { dispatch }) => {
    const response = await axios.put(
      `${api_endpoint}/category`,

      { name: name, description: description }
    );

    dispatch(fetchCategories());
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default categorySlice.reducer;
