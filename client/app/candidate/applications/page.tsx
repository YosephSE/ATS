import React from "react";
import ApplicationList from "@/components/candidate/ApplicationList";
import Header from "@/components/Header";

const MyApplications = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold mb-6">My Applications</h1>
          <ApplicationList />
        </div>
      </main>
    </div>
  );
};

export default MyApplications;