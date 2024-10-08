import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { candidateProfile, LoginUserPayload, passwordPayload, RegisterUserPayload, TokenPayload, UserSlice } from "../../../types/users.types";
import axios from "axios";
import api from "../api";

const initialState: UserSlice = {
    loggedInUser: null,
    applications: [],
    profile: null,
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
            localStorage.setItem('userToken', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message);
        }
    }
);

export const fetchuser = createAsyncThunk(
    "user/fetchuser",
    async (token: TokenPayload, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${api}/candidates/status`, token)
            return response.data
        } catch(error: any){
            return rejectWithValue(error.response?.data?.error || error.response.data.message);
        }
    }
)

export const login = createAsyncThunk(
    "user/login",
    async (user: LoginUserPayload, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/candidates/login`, user);
            localStorage.setItem('userToken', response.data.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${api}/candidates/logout`);
            localStorage.removeItem('userToken')
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message);
        }
    }
);

export const profile = createAsyncThunk(
    "user/profile",
    async (_, { rejectWithValue }) => {
        try{
            const response = await axios.get(`${api}/candidates/profile`)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message)
        }
    }
)

export const updateprofile = createAsyncThunk(
    "user/updateprofile",
    async( user: any, { rejectWithValue }) => {
        try{
            const response = await axios.put(`${api}/candidates/profile`, user)
            return response.data
        } catch(error: any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message)
        }
    }
)

export const myapplications =createAsyncThunk(
    "user/myapplications",
    async(_, { rejectWithValue }) => {
        try{
            const response = await axios.get(`${api}/candidates/applications`)
            return response.data
        } catch(error: any){
            rejectWithValue(error.response?.data?.error || error.response.data.message)
        }
    }
)

export const changepassword = createAsyncThunk(
    "user/changepassword",
    async( {oldPassword, newPassword}: passwordPayload, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${api}/candidates/changepassword`, {oldPassword, newPassword})
            return response.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.error || error.response.data.message)
        }
    }
)
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetSuccess(state){
            state.isSuccess = false
        },
        resetError(state){
            state.isError = false
            state.error = null
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
            .addCase(updateprofile.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
            })
            .addCase(updateprofile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })

            //Change Password
            .addCase(changepassword.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(changepassword.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
            })
            .addCase(changepassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string;
            })
                        
            //My Applications
            .addCase(myapplications.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.error = null
            })
            .addCase(myapplications.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.error = null
                state.applications = action.payload
            })
            .addCase(myapplications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload as string || "Registration failed.";
            })

    },
});

export const { resetSuccess, resetError } = userSlice.actions;
export default userSlice.reducer;
