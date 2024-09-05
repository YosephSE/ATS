import React from "react";
import Sidebar from "@/components/SideBar";
// import { Dashboard } from '@mui/icons-material';
import Stats from "@/components/Stats";
import Chart from "@/components/PieChart";

const Statistics = () => {
  const jobs = [
    { id: 1, value: 30, label: "Active" },
    { id: 2, value: 20, label: "Inactive" },
  ];
  const applications = [
    { id: 1, value: 5, label: "Pending" },
    { id: 2, value: 10, label: "Accepted" },
    { id: 3, value: 15, label: "Rejected" },
  ];

  return (
    <div className="flex bg-[#F8FDFF]">
      <Sidebar />
      <div className="w-[80%] mx-auto p-6 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Statistics</h2>
        <div>
          <Stats />
          <div className="flex flex-wrap py-7 md:py-11">
          <Chart data={jobs} />
          <Chart data={applications} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
