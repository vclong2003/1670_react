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
    await axios.post(
      `${api_endpoint}/category`,
      { name: name, description: description },
      { withCredentials: true }
    );

    dispatch(fetchCategories());
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name, description }, { dispatch }) => {
    await axios.put(`${api_endpoint}/category/${id}`, {
      name: name,
      description: description,
    });

    dispatch(fetchCategories());
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { loading: false, items: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch category
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
    });

    // Add category
    builder.addCase(addCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default categorySlice.reducer;
