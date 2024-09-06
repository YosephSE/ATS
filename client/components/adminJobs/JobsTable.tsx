import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
const columns: GridColDef[] = [
  {
    field: "jobTitle",
    headerName: "Job Title",
    //   width: 200,
    flex: 2,
  },
  {
    field: "location",
    headerName: "Location",
    // width: 130,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    // width: 90,
    flex: 1,
  },
  {
    field: "department",
    headerName: "Department",
    // width: 130,
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    // width: 130,
    flex: 1,
  },
  {
    field: "applications",
    headerName: "Applications",
    // width: 130,
    flex: 1,
  },
  {
    field: "postedBy",
    headerName: "Posted By",
    // width: 130,
    flex: 1,
  }
];

const rows = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    location: "Winterfell",
    status: "Active",
    department: "Engineering",
    type: "Full-time",
    applications: 10,
  },
  {
    id: 2,
    jobTitle: "Manager",
    location: "King's Landing",
    status: "Closed",
    department: "Operations",
    type: "Full-time",
    applications: 5,
  },
  {
    id: 3,
    jobTitle: "HR Specialist",
    location: "Casterly Rock",
    status: "Active",
    department: "HR",
    type: "Part-time",
    applications: 7,
  },
  {
    id: 4,
    jobTitle: "Data Analyst",
    location: "Winterfell",
    status: "Open",
    department: "Data",
    type: "Contract",
    applications: 12,
  },
  {
    id: 5,
    jobTitle: "Chief of Staff",
    location: "Dragonstone",
    status: "Active",
    department: "Administration",
    type: "Full-time",
    applications: 15,
  },
  {
    id: 6,
    jobTitle: "Senior Developer",
    location: "Asshai",
    status: "Closed",
    department: "Engineering",
    type: "Full-time",
    applications: 8,
  },
  {
    id: 7,
    jobTitle: "Marketing Lead",
    location: "King's Landing",
    status: "Active",
    department: "Marketing",
    type: "Contract",
    applications: 4,
  },
  {
    id: 8,
    jobTitle: "UI/UX Designer",
    location: "Braavos",
    status: "Open",
    department: "Design",
    type: "Full-time",
    applications: 9,
  },
  {
    id: 9,
    jobTitle: "Product Manager",
    location: "Meereen",
    status: "Active",
    department: "Product",
    type: "Full-time",
    applications: 6,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
