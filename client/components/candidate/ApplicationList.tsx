"use client";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { myapplications } from "@/redux/slices/UserSlice";
import { RootState } from "@/redux/Store";
import React, { useEffect } from "react";

const ApplicationList = () => {
  const applications = useAppSelector((state: RootState) => state.user.applications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchApplications = async () => {
      await dispatch(myapplications());
    };

    fetchApplications();
  }, [dispatch]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="relative flex flex-col w-full h-full dark:text-slate-200 dark:bg-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="p-6">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                    Title
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none ">
                    Location
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                    Status
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none">
                    Department
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:border-slate-500 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-100"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((application) => (
                <tr key={application._id}>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {application.jobId.title}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {application.jobId.type}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {application.jobId.location}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${
                          application.status === "pending"
                            ? "text-yellow-800 bg-yellow-400/30 dark:bg-yellow-300/30"
                            : application.status === "approved"
                            ? "text-green-800 bg-green-400/30 dark:bg-green-300/30"
                            : "text-red-800 bg-red-400/30 dark:bg-red-300/30"
                        }`}
                      >
                        <span>{application.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="text-sm text-slate-700 dark:text-slate-200">
                      {application.jobId.department}
                    </p>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
