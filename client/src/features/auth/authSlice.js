import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      // return only serializable err info

      // server responds with an error message
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);

      // network error or no response
      return rejectWithValue({ message: error.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      // returns server error
      if (error.response && error.response.data)
        return rejectWithValue(error.response.data);

      // returns network error or no response
      return rejectWithValue({ message: error.message });
    }
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/auth/check-auth", {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
    return res.data;
  } catch (error) {
    throw error.message;
  }
});

// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   const res = await axios.get("http://localhost:5000/api/auth/check-auth", {
//     withCredentials: true,
//   });

//   console.log("res", res);
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Failed to register";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.status ? true : false;
        state.user = action.payload.status ? action.payload?.data?.user : null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.status ? true : false;
        state.user = action.payload.status ? action.payload?.data?.user : null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
