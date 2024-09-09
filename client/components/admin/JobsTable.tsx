"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { Switch, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { alljobs, editjob } from "@/redux/slices/JobSlice";
import { RootState } from "@/redux/Store";
import { Jobs } from "../../../types/job.types";

interface LoadingState {
  [key: string]: boolean;
}

export default function DataTable() {
  const dispatch = useAppDispatch();
  const allJobs = useAppSelector((state: RootState) => state.jobs.allJobs);
  const [localJobs, setLocalJobs] = useState<Jobs[]>([]);
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});


  useEffect(() => {
    if(allJobs){
      setLocalJobs(allJobs.map(job => ({ ...job, id: job._id })));
    } else{
      setLocalJobs([]);
    }
  }, [allJobs]);


  const rows = localJobs;

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    setLocalJobs(prev => 
      prev.map(job => job._id === id ? { ...job, status: newStatus } : job)
    );

    try {
      await dispatch(editjob({ id, job: { status: newStatus } }));
    } catch (error) {
      console.error("Failed to update job status:", error);
      setLocalJobs(prev => 
        prev.map(job => job._id === id ? { ...job, status: !newStatus } : job)
      );
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  };

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
      renderCell: (params) => (
        loadingStates[params.id.toString()] ? (
          <CircularProgress size={20} />
        ) : (
          <Switch 
            color="primary" 
            checked={params.row.status}
            onChange={(event) => {
              event.stopPropagation();
              handleStatusChange(params.id.toString(), event.target.checked);
            }}
            onClick={(event) => event.stopPropagation()}
          />
        )
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
      await dispatch(alljobs());
    }
    fetchJobs();
  }, [dispatch]);


  return (
    <div className="h-auto w-full max-w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[20, 50, 100, 1000]}
          sx={{ border: 0 }}
          autoHeight
        />
      </div>
    </div>
  )
}