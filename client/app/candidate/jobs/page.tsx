"use client";
import React, { useEffect, useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import { Tune } from "@mui/icons-material";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import JobCard from "@/components/JobCard";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { acitvejobs } from "@/redux/slices/JobSlice";
import SingleJob from "@/components/SingleJob";
import JobListingLoadingSkeleton from "@/components/skeletons/candidateJobs";

const Jobs = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); 
  const [open, setOpen] = useState(false);
  const currentState = useAppSelector((state: RootState) => state.jobs);
  const alljobs = currentState.activeJobs;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); 
      await dispatch(acitvejobs(""));
      setLoading(false); 
    };

    fetchJobs();
  }, [dispatch]);

  if (loading) {
    return <JobListingLoadingSkeleton />; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <Header page="home" />
      <main className="container mx-auto mt-8 px-4 lg:px-10">
        <div className="flex justify-center">
          <Tabs value={0} className="mb-6 border-b-2 border-gray-300 dark:border-gray-700">
            <Tab
              label="Jobs"
              className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            />
          </Tabs>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/5">
            <div className="flex items-center mb-6">
              <IconButton onClick={() => setOpen(!open)}>
                <Tune className="text-blue-600" />
              </IconButton>
              <h6 className="text-2xl font-semibold ml-3">Filters</h6>
            </div>

            {open && <FilterPanel />}

            <div className="max-h-[500px] overflow-y-auto space-y-4 px-4 py-2">
              {alljobs?.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </div>
          {alljobs?.length ? (
            <SingleJob />
          ) : (
            <div className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-gray-100 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
              <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">No Jobs</h1>
                <p className="text-lg text-gray-600 mb-6">
                  It looks like there are currently no jobs available. Please check back later!
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Go to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Jobs;