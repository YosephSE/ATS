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
                  <td className="p-4 border-b border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 dark:text-slate-200 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zM9 4.505v-.027a1.647 1.647 0 011.544-1.46c.987-.03 1.986-.03 2.873 0A1.647 1.647 0 0115 4.478v.027a50.708 50.708 0 00-6 0zM7.584 19.5h8.832a1.5 1.5 0 001.496-1.385L18.91 6.793a48.894 48.894 0 00-13.82 0l.998 11.322a1.5 1.5 0 001.496 1.385z"
                            clipRule="evenodd"
                          ></path>
                          <path d="M9.732 9.75a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75zm4.536 0a.75.75 0 01.75.75v5a.75.75 0 11-1.5 0v-5a.75.75 0 01.75-.75z"></path>
                        </svg>
                      </span>
                    </button>
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
