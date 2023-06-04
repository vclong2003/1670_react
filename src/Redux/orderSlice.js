import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const fetchConsoleOrders = createAsyncThunk(
  "order/fetchConsoleOrders",
  async () => {
    const response = await axios.get(`${api_endpoint}/order/all`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const fetchOrderItems = createAsyncThunk(
  "order/fetchOrderItems",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/order/`+id, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status}, { dispatch }) => {
    await axios.put(
      `${api_endpoint}/order/${id}`,
      { status: status },
      { withCredentials: true }
    );

    dispatch(fetchConsoleOrders());
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchConsoleOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchConsoleOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchOrderItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderItems.fulfilled, (state, action) => {
      state.orderItems = action.payload;
      state.loading = false;
    });
  },
});

export default orderSlice.reducer;
