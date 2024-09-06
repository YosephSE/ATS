import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Jobs, JobsSlice } from "../../../types/job.types";
import axios from "axios";
import api from "../api";

const initialState: JobsSlice = {
    allJobs: null,
    activeJobs: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null
}

export const postJob = createAsyncThunk(
    "jobs/post",
    async ( job: Jobs, { rejectWithValue }) => {
        try{
            const response = await axios.post(`${api}/`, job)
            return response.data
        } catch(error:any ){
            return rejectWithValue(error.response?.data?.error || error.error)
        }
    }
)

const JobSlice = createSlice({
    name: "Jobs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Post Job
            .addCase(postJob.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(postJob.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(postJob.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.payload as string
            })
    }
})