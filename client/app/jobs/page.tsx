"use client"
import React, { useEffect, useState } from 'react';
import {  
  Button, 
  Card, 
  CardContent, 
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import {  Tune } from '@mui/icons-material';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import JobCard from '@/components/JobCard';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { RootState } from '@/redux/store';
import { acitvejobs } from '@/redux/slices/JobSlice';
import SingleJob from '@/components/SingleJob';

const Jobs = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchJobs = async () => {
      await dispatch(acitvejobs(""))
    }

    fetchJobs()
  }, [])
  const [open, setOpen] = useState(false)
  const currentState = useAppSelector((state: RootState) => state.jobs)
  const alljobs = currentState.activeJobs
  return (
    <div className="min-h-screen bg-gray-100">
      <Header page="home"/>
      <main className="container mx-auto mt-4 px-4">
        <div className='flex justify-center'>
          <Tabs value={0} className="mb-4 ">
            <Tab label="Jobs" />
          </Tabs>
        </div>

        <div className='flex gap-5'>
          <div>
            <div className="flex items-center mb-4">
              <IconButton onClick={() => setOpen(!open)}>
                <Tune className="text-blue-600" />
              </IconButton>
              <h6 className='text-2xl font-semibold ml-3'>Filters</h6>
            </div>

            {
              open && <FilterPanel />
            }
            {
              alljobs?.map( (job) =>(
                <JobCard key={job._id} job={job} />
              ))
            }
          </div>
          <SingleJob />
        </div>
      </main>
    </div>
  );
};

export default Jobs;
