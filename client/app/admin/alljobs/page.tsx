import React from "react";
import Sidebar from "@/components/SideBar";
import DataTable from "@/components/admin/JobsTable";

const allJobs = () => {
  return (
    <div className="flex bg-[#F8FDFF] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <Sidebar />
      <div className="w-[80%] mx-auto p-6 min-h-screen">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">All Jobs</h2>
        <div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default allJobs;
