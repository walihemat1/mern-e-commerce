import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
};

export const addProduct = createAsyncThunk(
  "add-product",
  async (productData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/product",
        productData,
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // products = [action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { actions } = productSlice.actions;
export default productSlice.reducer;
