import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_endpoint}/auth/register`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signout = createAsyncThunk("user/signout", async () => {
  await axios.delete(`${api_endpoint}/auth/logout`, { withCredentials: true });
  return;
});

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
    fetchCurrentUserLoading: false,
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
      state.fetchCurrentUserLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      const user = action.payload;

      state.loggedIn = true;
      state.id = user.id;
      state.email = user.email;
      state.role = user.role;

      state.fetchCurrentUserLoading = false;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.fetchCurrentUserLoading = false;
    });

    // Signin
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state) => {
      state.loading = false;
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
    });
    builder.addCase(signup.rejected, (state) => {
      state.loading = false;
    });

    // Signout
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
