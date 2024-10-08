import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Jobs, JobsSlice } from '../../../types/job.types';
import api from '../api';

const initialState: JobsSlice = {
  allJobs: [],
  activeJobs: [],
  currentJob: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const alljobs = createAsyncThunk(
  "jobs/alljobs",
  async(_, { rejectWithValue }) => {
    try{
      const response = await axios.get(`${api}/jobs`)
      return response.data
    } catch(error:any){
      return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
)
export const acitvejobs = createAsyncThunk(
  "jobs/activejobs",
  async(query: string, { rejectWithValue }) => {
    try{
      const response = await axios.get(`${api}/jobs?status=true&${query}`)
      return response.data
    } catch(error:any){
      return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
)


export const postjob = createAsyncThunk(
  "jobs/postjob",
  async (job: Jobs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/jobs`, job);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.response?.data?.message);
    }
  }
);

export const singlejob = createAsyncThunk(
    "jobs/singlejob",
    async (id: string, { rejectWithValue }) => {
        try{
            const response = await axios.get(`${api}/jobs/${id}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
        }
    }
)

export const editjob = createAsyncThunk(
  "jobs/editjob",
  async ({id, job}: {id:string, job:any}, {rejectWithValue}) => {
    try{
      const response = await axios.put(`${api}/jobs/${id}`, job)
      return response.data
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
)



const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetError(state){
        state.isError = false
        state.error = null
        state.error = null
    },
    resetCurrentJob(state) {
      state.currentJob = null
    },
    resetSuccess(state) {
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
        //Post Job
      .addCase(postjob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(postjob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postjob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      //SingleJob
      .addCase(singlejob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(singlejob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentJob = action.payload
      })
      .addCase(singlejob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      //Edit Job
      .addCase(editjob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(editjob.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editjob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      //Active Jobs
      .addCase(acitvejobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(acitvejobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeJobs = action.payload
        state.currentJob = action.payload[0]
      })
      .addCase(acitvejobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })

      //All Jobs
      .addCase(alljobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(alljobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allJobs = action.payload
      })
      .addCase(alljobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })
  },
});

export const { resetError, resetCurrentJob, resetSuccess } = jobSlice.actions
export default jobSlice.reducer;