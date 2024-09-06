import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterUserPayload } from "../../../types/users.types";
import axios from "axios";
import api from "../api";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface UserSlice {
    loggedInUser: User | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}

const initialState: UserSlice = {
    loggedInUser: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
};

export const register = createAsyncThunk(
    "user/register",
    async (user: RegisterUserPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/candidates/register`, user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser(state) {
            state.loggedInUser = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            });
    },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
