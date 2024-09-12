import React from "react";
import AdminApprove from "@/components/admin/AdminApprove";
import Sidebar from "@/components/SideBar";

const ApproveAdmin = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <Sidebar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Waiting List
          </h1>
          <AdminApprove />
        </div>
      </main>
    </div>
  );
};

export default ApproveAdmin;
