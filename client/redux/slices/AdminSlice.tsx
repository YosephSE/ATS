import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUserPayload, ContactPayload } from "../../../types/users.types";
import axios from "axios";
import api from "../api";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface AdminSlice {
    loggedInUser: User | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}

const initialState: AdminSlice = {
    loggedInUser: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
};

export const contact = createAsyncThunk(
    "user/contact",
    async (user: ContactPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/admins/contact`, user);
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
            const response = await axios.post(`${api}/admins/login`, user)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const logOut = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/candidates/logout`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        resetSuccess(state){
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            //Contact Admin
            .addCase(contact.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.error = null;
            })
            .addCase(contact.fulfilled, (state, action) => {
                state.loggedInUser = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(contact.rejected, (state, action) => {
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

            //Log out
            .addCase(logOut.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.loggedInUser = null
            })
    },
});

export const { resetSuccess } = adminSlice.actions;
export default adminSlice.reducer;
