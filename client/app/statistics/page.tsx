import React from "react";
import Sidebar from "@/components/SideBar";
import Stats from "@/components/stats/Stats";
import Chart from "@/components/stats/PieChart";

const Statistics = () => {
  const jobs = [
    { id: 1, value: 30, label: "Active", color: "#92BFB1" },
    { id: 2, value: 20, label: "Inactive", color: "#FFD400" },
  ];
  const applications = [
    { id: 1, value: 5, label: "Pending", color: "#FFD400" },
    { id: 2, value: 10, label: "Accepted", color: "#4D9078" },
    { id: 3, value: 15, label: "Rejected", color: "#FF5A5F" },
  ];

  return (
    <div className="flex bg-[#F8FDFF]">
      <Sidebar />
      <div className="w-[80%] mx-auto p-6 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Statistics</h2>
        <div>
          <Stats />
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
