import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint, storage } from "../Services/config";
import { v4 as uuidv4 } from "uuid"; // For unique thumbnail file name
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ category, search }) => {
    const response = await axios.get(
      `${api_endpoint}/product/?category=${category || ""}&search=${
        search || ""
      }`
    );

    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await axios.get(`${api_endpoint}/product/${id}`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ productData, thumbnailFile }, { dispatch, rejectWithValue }) => {
    try {
      const storageRef = ref(
        storage,
        `thumbnails/${uuidv4()}/${thumbnailFile.name}`
      );
      const uploadSnapshot = await uploadBytes(storageRef, thumbnailFile); // Upload file to storage
      productData.thumbnailUrl = await getDownloadURL(uploadSnapshot.ref); // Get download url of the file
    } catch (error) {
      return rejectWithValue(error);
    }

    try {
      const response = await axios.post(
        `${api_endpoint}/product`,
        { ...productData },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    items: [],
    selectedItem: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });

    // Fetch product by id
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedItem = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.loading = false;
    });

    // Add product
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
