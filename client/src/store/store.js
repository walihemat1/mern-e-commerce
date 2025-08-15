import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/admin/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default store;
