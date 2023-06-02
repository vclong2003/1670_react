import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const staffSlice = createSlice({
  name: "staff",
  initialState: { loading: false, members: [] },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch staff
    builder.addCase(fetchStaff.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStaff.fulfilled, (state, action) => {
      state.members = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchStaff.rejected, (state, action) => {
      state.loading = false;
    });

    // Add staff
    builder.addCase(addStaff.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addStaff.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const fetchStaff = createAsyncThunk("staff/fetchStaff", async () => {
  const response = await axios.get(`${api_endpoint}/staff`);
  return response.data;
});

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async ({ name, phone, address, email, password }, { dispatch }) => {
    await axios.post(
      `${api_endpoint}/staff`,
      {
        name: name,
        phone: phone,
        address: address,
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    dispatch(fetchStaff());
  }
);

export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, name, phone, address }, { dispatch }) => {
    await axios.put(`${api_endpoint}/staff/${id}`, {
      id: id,
      name: name,
      phone: phone,
      address: address,
    });

    dispatch(fetchStaff());
  }
);

export default staffSlice.reducer;
