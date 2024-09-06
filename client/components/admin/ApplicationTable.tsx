"use client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

const columns: GridColDef[] = [
  {
    field: "candidateFullName",
    headerName: "Candidate Name",
    flex: 1.3,
  },
  {
    field: "jobTitle",
    headerName: "Job Title",
    flex: 1.2,
  },
  {
    field: "jobStatus",
    headerName: "Job Status",
    flex: 1,
  },
  {
    field: "applicationStatus",
    headerName: "Application Status",
    flex: 1,
    editable: true,
    renderCell: (params) => (
      <ApplicationStatusDropdown
        value={params.value}
        onChange={(newValue: any) =>
          params.api.updateRows([
            { ...params.row, applicationStatus: newValue },
          ])
        }
      />
    ),
  },
  {
    field: "applicationDate",
    headerName: "Applied On",
    flex: 1,
  },
];

const initialRows = [
  {
    id: 1,
    candidateFullName: "Jon Snow",
    jobTitle: "Software Engineer",
    jobStatus: "Active",
    applicationStatus: "In Review",
    applicationDate: "2023-09-01",
  },
  {
    id: 2,
    candidateFullName: "Tyrion Lannister",
    jobTitle: "Manager",
    jobStatus: "Closed",
    applicationStatus: "Rejected",
    applicationDate: "2023-08-15",
  },
  {
    id: 3,
    candidateFullName: "Sansa Stark",
    jobTitle: "HR Specialist",
    jobStatus: "Active",
    applicationStatus: "In Review",
    applicationDate: "2023-09-05",
  },
  {
    id: 4,
    candidateFullName: "Arya Stark",
    jobTitle: "Data Analyst",
    jobStatus: "Open",
    applicationStatus: "Shortlisted",
    applicationDate: "2023-09-10",
  },
  {
    id: 5,
    candidateFullName: "Daenerys Targaryen",
    jobTitle: "Chief of Staff",
    jobStatus: "Active",
    applicationStatus: "Interview Scheduled",
    applicationDate: "2023-09-12",
  },
  {
    id: 6,
    candidateFullName: "Jaime Lannister",
    jobTitle: "Senior Developer",
    jobStatus: "Closed",
    applicationStatus: "Rejected",
    applicationDate: "2023-07-25",
  },
  {
    id: 7,
    candidateFullName: "Cersei Lannister",
    jobTitle: "Marketing Lead",
    jobStatus: "Active",
    applicationStatus: "In Review",
    applicationDate: "2023-09-07",
  },
  {
    id: 8,
    candidateFullName: "Jorah Mormont",
    jobTitle: "UI/UX Designer",
    jobStatus: "Open",
    applicationStatus: "In Review",
    applicationDate: "2023-09-03",
  },
  {
    id: 9,
    candidateFullName: "Daario Naharis",
    jobTitle: "Product Manager",
    jobStatus: "Active",
    applicationStatus: "Shortlisted",
    applicationDate: "2023-09-14",
  },
];

const ApplicationStatusDropdown = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (newValue: any) => void;
}) => (
  <Select value={value} onChange={(e) => onChange(e.target.value)} fullWidth>
    <MenuItem value="In Review">In Review</MenuItem>
    <MenuItem value="Rejected">Rejected</MenuItem>
    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
    <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
  </Select>
);

export default function DataTable() {
  const [rows, setRows] = useState(initialRows);

  const handleRowUpdate = (updatedRow: any) => {
    const updatedRows = rows.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setRows(updatedRows);
    return updatedRow;
  };

  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[20, 50, 100, 1000]}
        sx={{ border: 0 }}
        processRowUpdate={handleRowUpdate}
      />
    </Paper>
  );
}
