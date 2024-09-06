import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Jobs, JobsSlice } from '../../../types/job.types';

const api = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export const postjob = createAsyncThunk(
  "jobs/postjob",
  async (job: Jobs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/jobs/`, job);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState: JobsSlice = {
  allJobs: [],
  activeJobs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postjob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(postjob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allJobs?.push(action.payload);
      })
      .addCase(postjob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      });
  },
});

export default jobSlice.reducer;