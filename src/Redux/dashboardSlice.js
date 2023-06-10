import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const getOrderStatistic = createAsyncThunk(
  "dashboard/getOrderStatistic",
  async () => {
    const response = await axios.get(`${api_endpoint}/dashboard`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    orderStatistic: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get order statistic
    builder.addCase(getOrderStatistic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderStatistic.fulfilled, (state, action) => {
      state.orderStatistic = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderStatistic.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default dashboardSlice.reducer;
