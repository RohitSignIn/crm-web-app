import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../config/axiosInstance";

export const signin = createAsyncThunk("auth/signin", async (data) => {
  try {
    const response = await api.post("auth/signin", data);
    return response.status === 201 || 200 ? response.data : false;
  } catch (err) {
    console.log("Printing error: " + err);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = await api.post("auth/signup", data);
    return response.status === 200 || 201 ? true : false;
  } catch (err) {
    console.log("Printing error: " + err);
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    role: localStorage.getItem("role") || "",
    user: localStorage.getItem("user") || "",
    data: localStorage.getItem("data") || undefined,
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  },

  reducers: {
    logout: (state) => {
      state.role = "";
      state.user = "";
      state.data = undefined;
      state.token = "";
      state.isLoggedIn = false;
      console.log("Logged out");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      if (!action.payload) return;
      // setting State
      state.role = action.payload?.userData.userType;
      state.user = action.payload?.userData.email;
      state.data = action.payload?.userData;
      state.token = action.payload?.token;
      state.isLoggedIn = true;

      // setting LocalStorage
      localStorage.setItem("role", state.role);
      localStorage.setItem("user", state.user);
      localStorage.setItem("data", JSON.stringify(state.data));
      localStorage.setItem("token", state.token);
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
    });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
