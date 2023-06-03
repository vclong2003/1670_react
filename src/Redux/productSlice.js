import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_endpoint } from "../Services/config";
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
  async (productData, { dispatch, rejectWithValue }) => {
    const {
      name,
      description,
      price,
      category,
      thumbnailFile,
      author,
      publisher,
      publishcationDate,
    } = productData;

    let downloadURL = "https://placehold.co/200x250"; // Default thumbnail url will be placeholder image
    try {
      const storageRef = ref(Storage, `thumbnails/${uuidv4()}`); // Ref to the file with unique uuid name
      const uploadSnapshot = await uploadBytes(storageRef, thumbnailFile); // Upload file to storage
      downloadURL = await getDownloadURL(uploadSnapshot.ref); // Get download url of the file
    } catch (error) {
      return rejectWithValue(error);
    }

    try {
      const response = await axios.post(
        `${api_endpoint}/product`,
        {
          name,
          description,
          price,
          category,
          thumbnail: downloadURL,
          author,
          publisher,
          publishcationDate,
        },
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
  },
});

export default productsSlice.reducer;
