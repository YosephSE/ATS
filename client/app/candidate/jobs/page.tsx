"use client";
import React, { useEffect, useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import { Tune } from "@mui/icons-material";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import JobCard from "@/components/JobCard";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/store";
import { acitvejobs } from "@/redux/slices/JobSlice";
import SingleJob from "@/components/SingleJob";

const Jobs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      await dispatch(acitvejobs(""));
    };

    fetchJobs();
  }, []);

  const [open, setOpen] = useState(false);
  const currentState = useAppSelector((state: RootState) => state.jobs);
  const alljobs = currentState.activeJobs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header page="home" />

      <main className="container mx-auto mt-8 px-4 lg:px-10">
        <div className="flex justify-center">
          <Tabs value={0} className="mb-6 border-b-2 border-gray-300">
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
          <SingleJob />
        </div>
      </main>
    </div>
  );
};

export default Jobs;
