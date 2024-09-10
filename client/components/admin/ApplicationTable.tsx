"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { allapplications } from "@/redux/slices/ApplicationSlice";
import ButtonMenu from "./ButtonMenu";
import Link from "next/link";

export default function DataTable() {
  const allApplications = useAppSelector((state: RootState) => state.applications.allApplications);
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const fetchApplication = async () => {
      await dispatch(allapplications());
    };
    fetchApplication();
  }, [dispatch]);

  useEffect(() => {
    const formattedRows = allApplications?.map((app, index) => ({
      id: app._id,
      name: `${app.candidateId.firstName} ${app.candidateId.lastName}`,
      title: app.jobId.title,
      jobstatus: app.jobId.status ? "Active" : "Inactive",
      status: app.status,
      AIScore: app.AIScore,
      pdf: app.candidateId.pdf,
      createdAt: new Date(app.createdAt).toLocaleDateString(),
    }));
    setRows(formattedRows || []);
  }, [allApplications]);

  console.log()
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
      field: "AIScore",
      headerName: "AI Score",
      flex: 1,
    },
    {
      field: "pdf",
      headerName: "Application",
      flex: 1,
      renderCell: (params) => (
        <Link href={params.row.pdf} className="text-blue-600 hover:underline">View Application</Link>
      )
    },
    {
      field: "status",
      headerName: "Application Status",
      flex: 1,
      renderCell: (params) => (
        <ButtonMenu value = {params.row.status} id={params.row.id}/>
      ),
    },
    {
      field: "createdAt",
      headerName: "Applied On",
      flex: 1,
    },
  ];
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