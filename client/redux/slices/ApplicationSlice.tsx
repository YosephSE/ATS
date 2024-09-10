import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Application } from '../../../types/applications.types'
import axios from 'axios';
import api from "../api"

export interface ApplicationSlice {
    allApplications: Application[] | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}

const initialState: ApplicationSlice = {
  allApplications: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const allapplications = createAsyncThunk(
    "applications/allapplications",
    async(_, { rejectWithValue }) => {
        try{
            const response = await axios.get(`${api}/applications`)
            return response.data;
        }
        catch(error: any){
            return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
        }
    }
)

export const apply = createAsyncThunk(
  "applications/apply",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api}/applications`, 
        { jobId: id },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
);


export const updateapplication = createAsyncThunk(
  "applications/updateapplication",
  async ({id, data: { status }}: {id: string, data: { status: string} }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${api}/applications/${id}`, {status: status});
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || error.response?.data?.message);
    }
  }
);


const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //All Applications
        .addCase(allapplications.pending, (state) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = false;
          state.error = null;
        })
        .addCase(allapplications.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.allApplications = action.payload
        })
        .addCase(allapplications.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload as string;
        })

        //Update Application
        .addCase(updateapplication.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        })
        .addCase(updateapplication.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          if(state.allApplications){
            const index = state.allApplications.findIndex((state) => state._id === action.payload._id)
            if(index){
              state.allApplications[index] = action.payload
            }
          }
        })
        .addCase(updateapplication.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload as string;
        })

        //Apply
        .addCase(apply.pending, (state) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = false;
          state.error = null;
        })
        .addCase(apply.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
        })
        .addCase(apply.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload as string;
        })

    },
  });
  

export default applicationSlice.reducer;