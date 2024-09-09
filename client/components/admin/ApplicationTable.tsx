"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Select, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { allapplications } from "@/redux/slices/ApplicationSlice";



export default function DataTable() {
  const allApplications = useAppSelector((state: RootState) => state.applications.allApplications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchApplication = async () => {
      await dispatch(allapplications());
    };

    fetchApplication();
  }, [dispatch]);

  const [rows, setRows] = useState<any>(allApplications ? allApplications.map((app) => ({
    id: app._id, 
    name: `${app.candidateId.firstName} ${app.candidateId.lastName}`, 
    title: app.jobId.title,
    jobstatus: app.jobId.status ? "Active" : "Inactive",
    status: app.status,
    createdAt: app.createdAt
  })) : []);

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
          onChange={(newValue: string) => handleStatusChange(params, newValue)}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Applied On",
      flex: 1,
    },
  ];

  const handleStatusChange = (params: any, newValue: string) => {
    params.api.updateRows([{ ...params.row, status: newValue }]);
  };

  const ApplicationStatusDropdown: React.FC<{
    value: string;
    onChange: (newValue: string) => void;
  }> = ({ value, onChange }) => (
    <Select value={value} onChange={(e) => onChange(e.target.value)} fullWidth>
      <MenuItem value="In Review" sx={{ backgroundColor: '#e0f7fa', margin: '4px', borderRadius: '4px' }}>In Review</MenuItem>
      <MenuItem value="Rejected" sx={{ backgroundColor: '#ffccbc', margin: '4px', borderRadius: '4px' }}>Rejected</MenuItem>
      <MenuItem value="Shortlisted" sx={{ backgroundColor: '#c8e6c9', margin: '4px', borderRadius: '4px' }}>Shortlisted</MenuItem>
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