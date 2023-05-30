import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/1670_API/config";

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }) => {
    const response = await axios.post(`${api_endpoint}/auth/login`, {
      email: email,
      password: password,
    });
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password }) => {
    const response = await axios.post(`${api_endpoint}/auth/register`, {
      email: email,
      password: password,
    });
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axios.get(`${api_endpoint}/auth`, {
      withCredentials: true,
    });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    loggedIn: false,
    id: null,
    email: null,
    role: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //Fetch current user
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      const user = action.payload;

      state.id = user.id;
      state.email = user.email;
      state.role = user.role;

      state.loading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
      window.location.href = "/";
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state) => {
      state.loading = false;
      window.location.href = "/";
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
