import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// MockAPI URL
const API_URL = "https://67c0364ab9d02a9f2248c75d.mockapi.io/users";

// 1️⃣ Signup
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 2️⃣ Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}?email=${email}`);
            const users = response.data;
            console.log(user)
            if (users.length === 0) {
                return rejectWithValue("User not found");
            }

            const user = users[0];
            if (user.password !== password) {
                return rejectWithValue("Incorrect password");
            }

            localStorage.setItem("token", user.id);
            return user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 3️⃣ Send OTP (Mocking OTP feature)
export const sendOtp = createAsyncThunk(
    "auth/sendOtp",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}?email=${email}`);
            const users = response.data;

            if (users.length === 0) {
                return rejectWithValue("User not found");
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            await axios.put(`${API_URL}/${users[0].id}`, { otp });

            return { email, otp };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// 4️⃣ Verify OTP & Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ email, otp, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}?email=${email}`);
            const users = response.data;

            if (users.length === 0) {
                return rejectWithValue("User not found");
            }

            const user = users[0];
            if (user.otp !== otp) {
                return rejectWithValue("Invalid OTP");
            }

            await axios.put(`${API_URL}/${user.id}`, { password: newPassword });
            return "Password updated successfully!";
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: localStorage.getItem("token") || null, loading: false, error: null, success: false },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => { state.loading = true; })
            .addCase(signupUser.fulfilled, (state, action) => { state.loading = false; state.success = true; })
            .addCase(signupUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.token = action.payload.id; })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(sendOtp.pending, (state) => { state.loading = true; })
            .addCase(sendOtp.fulfilled, (state, action) => { state.loading = false; state.success = true; })
            .addCase(sendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(resetPassword.pending, (state) => { state.loading = true; })
            .addCase(resetPassword.fulfilled, (state) => { state.loading = false; state.success = true; })
            .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
