import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { People, Description, Work } from "@mui/icons-material";

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <Paper elevation={5} className="p-4 flex items-center space-x-4 ">
    <div className="bg-sky-100 p-5 rounded-full">{icon}</div>
    <div>
      <Typography variant="h5" className="text-blue-500 font-bold">
        {value}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
    </div>
  </Paper>
);

const Stats = ({
  totalCandidates,
  totalApplications,
  totalJobs,
}: {
  totalCandidates: any;
  totalApplications: any;
  totalJobs: any;
}) => {
  return (
    <Box className="p-6" style={{ marginLeft: "20px" }}>
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<People className="text-blue-400" />}
            value={totalCandidates}
            label="Candidates"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<Description className="text-blue-400" />}
            value={totalApplications}
            label="Applications"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<Work className="text-blue-400" />}
            value={totalJobs}
            label="Active jobs"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;
