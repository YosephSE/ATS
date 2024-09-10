"use client";
import React from "react";

const ApplicationSkeleton = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="space-y-4">
        {/* Header Row */}
        <div className="grid grid-cols-7 gap-4 font-semibold text-gray-600 border-b pb-2">
          <div>Candidate Name</div>
          <div>Job Title</div>
          <div>Job Status</div>
          <div>AI Score</div>
          <div>Application</div>
          <div>Application Status</div>
          <div>Applied On</div>
        </div>

        {/* Skeleton Rows */}
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 items-center animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded"></div> {/* Candidate Name */}
            <div className="h-4 bg-gray-200 rounded"></div> {/* Job Title */}
            <div className="w-16 h-5 bg-blue-200 rounded-full"></div> {/* Job Status */}
            <div className="h-4 bg-gray-200 rounded"></div> {/* AI Score */}
            <div className="h-4 bg-gray-200 rounded"></div> {/* Application */}
            <div className="w-20 h-5 bg-red-200 rounded-full"></div> {/* Application Status */}
            <div className="h-4 bg-gray-200 rounded"></div> {/* Applied On */}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-x-2">
          <button className="px-2 py-1 border rounded">&lt;</button>
          <button className="px-2 py-1 border rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSkeleton;
