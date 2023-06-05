import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";
import { fetchCartItems } from "./cartSlice";

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const response = await axios.get(`${api_endpoint}/order/all`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/order/${id}`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const fetchCustomerOrders = createAsyncThunk(
  "order/fetchCustomerOrders",
  async () => {
    const response = await axios.get(`${api_endpoint}/order`, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/order`,
        { ...orderData },
        { withCredentials: true }
      );

      dispatch(fetchCartItems()); // Cart is cleared after order is placed, so we need to fetch cart items again
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (orderData, { dispatch, rejectWithValue }) => {
    const { id, status } = orderData;
    try {
      await axios.put(
        `${api_endpoint}/order/${id}`,
        { status: status },
        { withCredentials: true }
      );

      return dispatch(fetchAllOrders());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    updating: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all orders
    builder.addCase(fetchAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
    });

    // Fetch customer orders
    builder.addCase(fetchCustomerOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCustomerOrders.rejected, (state, action) => {
      state.loading = false;
    });

    // Fetch order by id
    builder.addCase(fetchOrderById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
    });

    // Add order
    builder.addCase(addOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = false;
    });

    // Update order status
    builder.addCase(updateOrderStatus.pending, (state, action) => {
      state.updating = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.updating = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.updating = false;
    });
  },
});

export default orderSlice.reducer;
