import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/1670_API/config";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axios.get(`${api_endpoint}/auth`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
    email: null,
    role: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default userSlice.reducer;
