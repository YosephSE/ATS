"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar";
import Stats from "@/components/stats/Stats";
import Chart from "@/components/stats/PieChart";
import axios from "axios";
import api from "@/redux/api";

const Statistics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/admins/stats`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;


  const jobs = [
    { id: 1, value: data.activeJobs ?? 0, label: "Active", color: "#92BFB1" },
    { id: 2, value: data.inactiveJobs ?? 0, label: "Inactive", color: "#FFD400" },
  ];

  const applications = [
    {
      id: 1,
      value: data.pendingApplications,
      label: "Pending",
      color: "#FFD400",
    },
    {
      id: 2,
      value: data.acceptedApplications,
      label: "Accepted",
      color: "#4D9078",
    },
    {
      id: 3,
      value: data.rejectedApplications,
      label: "Rejected",
      color: "#FF5A5F",
    },
  ];

  return (
    <div className="flex bg-[#F8FDFF]">
      <Sidebar />
      <div className="w-[80%] mx-auto p-6 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Statistics</h2>
        <div>
          <Stats
            totalApplications={data.totalApplications}
            totalJobs={data.totalJobs}
            totalCandidates={data.totalCandidates}
          />
          <div className="flex flex-wrap py-7 md:py-11">
            <div className="w-full sm:w-1/2">
              <h1 className="text-sky-600 font-bold text-3xl pl-12 py-6">
                Jobs
              </h1>
              <Chart data={jobs} />
            </div>
            <div className="w-full sm:w-1/2">
              <h1 className="text-sky-600 font-bold text-3xl pl-12 py-6">
                Applications
              </h1>
              <Chart data={applications} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
