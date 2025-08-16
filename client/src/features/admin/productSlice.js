import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  products: [],
};

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/product",
        productData,
        {
          hdears: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);

      return rejectWithValue({ message: error.message });
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/product");
      return res?.data;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, productData }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/product/update/${productId}`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res?.data;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/admin/product/delete/${productId}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res?.data;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong!";
      })
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // products = [action.payload];
        state.products = [...action.payload.data];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Something went wrong!";
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // products = [action.payload];
        state.products = { ...action.payload.data };
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.error = action.payload?.error || "Something went wrong!";
      });
  },
});

export const { actions } = productSlice.actions;
export default productSlice.reducer;
