import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUserPayload, RegisterUserPayload } from "../../../types/users.types";
import axios from "axios";
import api from "../api";
import { fabClasses } from "@mui/material";

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

export const login = createAsyncThunk(
    "user/login",
    async ( user: LoginUserPayload, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${api}/candidates/login`, user)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

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
        resetSuccess(state){
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            //Register
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
            })

            //Login
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.loggedInUser = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })
    },
});

export const { resetUser, resetSuccess } = userSlice.actions;
export default userSlice.reducer;
