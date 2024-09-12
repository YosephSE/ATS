"use client";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { admin } from "../../../types/users.types";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { admins, approve } from "@/redux/slices/AdminSlice";

const AdminApprove = () => {
  const adminsState = useAppSelector((state: RootState) => state.admin);
  const dispatch = useAppDispatch();
  const [approving, setApproving] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(admins());
    };

    fetchUsers();
  }, [dispatch]);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setApproving((prev) => ({ ...prev, [id]: !currentStatus }));
    await dispatch(approve(id));
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="relative flex flex-col w-full h-full text-slate-700 bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 shadow-md rounded-xl bg-clip-border">
        <div className="p-6">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-slate-200 bg-slate-50">First Name</th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">Last Name</th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">Email</th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">Phone Number</th>
                <th className="p-4 border-y border-slate-200 bg-slate-50">Approved</th>
                <th className="p-4 border-y border-slate-200 bg-slate-50"></th>
              </tr>
            </thead>
            <tbody>
              {adminsState.admins.map((application) => (
                <tr key={application._id}>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    {application.firstName}
                  </td>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    {application.lastName}
                  </td>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    {application.email}
                  </td>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    {application.phoneNumber}
                  </td>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    <label className="flex items-center cursor-pointer">
                      <Switch
                        color="primary"
                        checked={approving[application._id] ?? application.approved}
                        onChange={() => handleToggle(application._id, application.approved)}
                      />
                    </label>
                  </td>
                  <td className="p-4 border-b dark:text-white border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase dark:text-white text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
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

export default AdminApprove;
