"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Switch, CircularProgress, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { alljobs, editjob } from "@/redux/slices/JobSlice";
import { RootState } from "@/redux/Store";
import { Jobs } from "../../../types/job.types";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import JobListingSkeleton from "@/app/admin/alljobs/loading";
import { useTheme } from "next-themes";

interface LoadingState {
  [key: string]: boolean;
}

export default function DataTable() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const allJobs = useAppSelector((state: RootState) => state.jobs.allJobs);
  const [localJobs, setLocalJobs] = useState<Jobs[]>([]);
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      await dispatch(alljobs());
    };
    fetchJobs();
  }, [dispatch]);

  console.log(allJobs)
  useEffect(() => {
    if (allJobs) {
      setLocalJobs(
        allJobs.map((job) => ({
          ...job,
          id: job._id,
          post: `${job.postedBy.firstName} ${job.postedBy.lastName}`,
        }))
      );
      setLoading(false); // Set loading to false when jobs are fetched
    } else {
      setLocalJobs([]);
    }
  }, [allJobs]);

  const rows = localJobs;

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    setLocalJobs((prev) =>
      prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
    );

    try {
      await dispatch(editjob({ id, job: { status: newStatus } }));
    } catch (error) {
      console.error("Failed to update job status:", error);
      setLocalJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: !newStatus } : job
        )
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/editjob/${id}`);
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
      renderCell: (params) =>
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
      field: "post",
      headerName: "Posted By",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.id.toString())} className = "dark:text-white">
          <Edit size={20} />
        </IconButton>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="h-auto w-full max-w-full overflow-x-auto">
      {loading ? (
        <JobListingSkeleton />
      ) : (
        <div className="min-w-[900px]">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[20, 50, 100, 1000]}
            sx={{
              border: 0,
              color: resolvedTheme === "dark" ? "white" : "black",
              "& .MuiDataGrid-columnHeaders": {
                color: "black",
              },
              "& .MuiDataGrid-footerContainer": {
                color: resolvedTheme === "dark" ? "white" : "black",
              },
              "& .MuiTablePagination-root": {
                color: resolvedTheme === "dark" ? "white" : "black", 
              },
              "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                color: resolvedTheme === "dark" ? "white" : "black", 
              },
              "& .MuiSelect-icon": {
                color: resolvedTheme === "dark" ? "white" : "black", 
              },
              "& .MuiTablePagination-actions .MuiSvgIcon-root": {
                color: resolvedTheme === "dark" ? "white" : "black",
              },
            }}
            autoHeight
          />
        </div>
      )}
    </div>
  );
}
