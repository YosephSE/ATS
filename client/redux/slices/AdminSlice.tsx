import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginUserPayload, ContactPayload, adminUserSlice, TokenPayload } from "../../../types/users.types";
import axios from "axios";
import api from "../api";


const initialState: adminUserSlice = {
    loggedInUser: null,
    profile: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
};

export const contact = createAsyncThunk(
    "admin/contact",
    async (user: ContactPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/admins/register`, user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.error);
        }
    }
);

export const fetchuser = createAsyncThunk(
    "admin/fetchuser",
    async (token: TokenPayload, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${api}/admins/status`, token )
            return response.data
        } catch(error: any){
            return rejectWithValue(error.response?.data?.error || error.error);
        }
    }
)
export const login = createAsyncThunk(
    "admin/login",
    async (user: LoginUserPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/admins/login`, user);
            sessionStorage.setItem('userToken', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.error);
        }
    }
);

export const logout = createAsyncThunk(
    "admin/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/candidates/logout`);
            localStorage.removeItem('adminToken')
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.error);
        }
    }
);

export const profile = createAsyncThunk(
    "admin/profile",
    async(_, { rejectWithValue }) => {
        try{
            const response = await axios.get(`${api}/admins/profile`)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.error || error.error)
        }
    }

)

export const updateprofile = createAsyncThunk(
    "admin/updateprofile",
    async( user: any, { rejectWithValue }) => {
        try{
            const response = await axios.put(`${api}/admins/profile`, user)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.error || error.error)
        }
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        resetSuccess(state){
            state.isSuccess = false
        },
        errorReset(state){
            state.error = null
            state.isError = false
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

            //Fetch User
            .addCase(fetchuser.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(fetchuser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.loggedInUser = action.payload
            })
            .addCase(fetchuser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })


            //Log out
            .addCase(logout.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.loggedInUser = null
            })

            //Profile
            .addCase(profile.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.profile = action.payload
            })
            .addCase(profile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })

            //Update Profile
            .addCase(updateprofile.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(updateprofile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.profile = action.payload
            })
            .addCase(updateprofile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })
    },
});

export const { resetSuccess, errorReset } = adminSlice.actions;
export default adminSlice.reducer;
