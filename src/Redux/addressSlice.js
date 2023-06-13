import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const response = await axios.get(`${api_endpoint}/address`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    const { name, phone, address, city, country } = addressData;

    try {
      const response = await axios.post(
        `${api_endpoint}/address`,
        addressData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (addressData, { dispatch, rejectWithValue }) => {
    const { name, phone, address, city, country } = addressData;

    try {
      await axios.put(
        `${api_endpoint}/address/${addressData.id}`,
        addressData,
        { withCredentials: true }
      );

      return dispatch(fetchAddresses());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${api_endpoint}/address/${id}`, {
        withCredentials: true,
      });

      return dispatch(fetchAddresses());
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    error: null,
    loading: false,
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch addresses
    builder.addCase(fetchAddresses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAddresses.rejected, (state) => {
      state.loading = false;
    });

    // Add address
    builder.addCase(addAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Update address
    builder.addCase(updateAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // Remove address
    builder.addCase(removeAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeAddress.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(removeAddress.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default addressSlice.reducer;
