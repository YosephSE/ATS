"use client";
import React, { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Switch } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { alljobs } from "@/redux/slices/JobSlice";
import { RootState } from "@/redux/store";




export default function DataTable() {
  const dispatch = useAppDispatch()
  const allJobs = useAppSelector((state: RootState) => state.jobs.allJobs)
  const rows = allJobs ? allJobs.map(job => ({ ...job, id: job._id })) : []
  const columns: GridColDef[] = [
    {
      field: "title",
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
        <Switch 
        color="primary" 
        checked={params.value} 
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
  
  
  const paginationModel = { page: 0, pageSize: 10 };
  useEffect(() => {
    const fetchJobs = async() => {
      await dispatch(alljobs())
    }
    fetchJobs()
  }, [])
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
