"use client";
import React from "react";

const JobListingSkeleton = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="space-y-4">
        <div className="grid grid-cols-8 gap-4 font-semibold text-gray-600 border-b pb-2">
          <div className="col-span-2">Job Title</div>
          <div>Location</div>
          <div>Status</div>
          <div>Department</div>
          <div>Type</div>
          <div>Applications</div>
          <div>Posted By</div>
        </div>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-8 gap-4 items-center animate-pulse"
          >
            <div className="col-span-2 h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="w-10 h-5 bg-blue-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>1-10 of 26</span>
        <div className="space-x-2">
          <button className="px-2 py-1 border rounded">&lt;</button>
          <button className="px-2 py-1 border rounded">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default JobListingSkeleton;
