import React from "react";
import Sidebar from "@/components/SideBar";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/adminJobs/JobsTable";

const allJobs = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "jobTitle", headerName: "Job Title", width: 130 },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 90,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <div className="flex bg-[#F8FDFF]">
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
