import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";

const staffSlice = createSlice({
  name: "staff",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStaffs.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const fetchStaffs = createAsyncThunk(
    "staff/fetchStaffs",
    async () => {
      const response = await axios.get(`${api_endpoint}/staff`);
      return response.data;
    }
);

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async ({name, phone, address, email, password}, {dispatch}) =>{
    const repsonse = await axios.post(`${api_endpoint}/staff`, {
      name: name,
      phone: phone,
      address: address,
      email: email,
      password: password
    },
    {withCredentials: true}
    );

    dispatch(fetchStaffs());
  }
)

export const staffInfor = createAsyncThunk(
  "staff/staffInfor",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/staff/${id}`);
    return response.data;
  }
);

export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ accountId, name, phone, address }, { dispatch}) => {
    const response = await axios.put(`${api_endpoint}/staff/${accountId}`,
      { 
        account: accountId,
        name: name,
        phone: phone,
        address: address
      },
    );
    dispatch(fetchStaffs());
  }
);

  export default staffSlice.reducer;