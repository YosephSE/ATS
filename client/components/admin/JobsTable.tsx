"use client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

const JobStatusDropdown = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (newValue: any) => void;
}) => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)} fullWidth>
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Closed">Closed</MenuItem>
      <MenuItem value="Open">Open</MenuItem>
    </Select>
  );
};

const columns: GridColDef[] = [
  {
    field: "jobTitle",
    headerName: "Job Title",
    flex: 1.5,
  },
  {
    field: "location",
    headerName: "Location",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: true,
    renderCell: (params) => (
      <JobStatusDropdown
        value={params.value}
        onChange={(newValue: any) =>
          params.api.updateRows([{ ...params.row, status: newValue }])
        }
      />
    ),
  },
  {
    field: "department",
    headerName: "Department",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "applications",
    headerName: "Applications",
    flex: 1,
  },
  {
    field: "postedBy",
    headerName: "Posted By",
    flex: 1,
  },
];

const initialRows = [
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
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState(initialRows);
  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[20, 50, 100, 1000]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
