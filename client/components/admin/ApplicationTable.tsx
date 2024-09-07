"use client";
import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/store";
import { allapplications } from "@/redux/slices/ApplicationSlice";


export default function DataTable() {
  const allApplications = useAppSelector((state: RootState) => state.applications.allApplications);
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchApplication = async() => {
      await dispatch(allapplications())
    }

    fetchApplication()

  }, [])

  const [rows, setRows] = useState(allApplications ? allApplications.map((app) => (
    {
      id: app._id, 
      name: `${app.candidateId.firstName} ${app.candidateId.lastName}`, 
      title: app.jobId.title,
      jobstatus: app.jobId.status? "Active": "Inactive",
      status: app.status,
      createdAt: app.createdAt
     }
  )) : []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Candidate Name",
      flex: 1.3,
    },
    {
      field: "title",
      headerName: "Job Title",
      flex: 1.2,
    },
    {
      field: "jobstatus",
      headerName: "Job Status",
      flex: 1,
    },
    {
      field: "status",
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
      field: "createdAt",
      headerName: "Applied On",
      flex: 1,
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
    </Select>
  );
  
  return (
    <Paper sx={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[20, 50, 100, 1000]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
