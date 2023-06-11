import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const getStatistic = createAsyncThunk(
  "dashboard/getStatistic",
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
    statistic: {
      revenue: [],
      orders: [],
      users: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Get order statistic
    builder.addCase(getStatistic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStatistic.fulfilled, (state, action) => {
      state.statistic = { ...action.payload };
      state.loading = false;
    });
    builder.addCase(getStatistic.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default dashboardSlice.reducer;
