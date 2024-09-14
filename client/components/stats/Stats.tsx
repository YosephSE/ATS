import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { People, Description, Work } from "@mui/icons-material";
import { useTheme } from "next-themes";

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <Paper 
      elevation={5} 
      className={`p-4 flex items-center space-x-4 ${
        resolvedTheme === 'dark' ? 'bg-slate-800' : ''
      }`}
    >
      <div className={`p-5 rounded-full ${
        resolvedTheme === 'dark' ? 'bg-slate-700' : 'bg-sky-100'
      }`}>
        {icon}
      </div>
      <div>
        <Typography 
          variant="h5" 
          className={`font-bold ${
            resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-500'
          }`}
        >
          {value}
        </Typography>
        <Typography 
          variant="body2" 
          className={resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        >
          {label}
        </Typography>
      </div>
    </Paper>
  );
};

const Stats = ({
  totalCandidates,
  totalApplications,
  totalJobs,
}: {
  totalCandidates: any;
  totalApplications: any;
  totalJobs: any;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <Box className="p-6" style={{ marginLeft: "20px" }}>
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<People className={resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-400'} />}
            value={totalCandidates}
            label="Candidates"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<Description className={resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-400'} />}
            value={totalApplications}
            label="Applications"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard 
            icon={<Work className={resolvedTheme === 'dark' ? 'text-blue-300' : 'text-blue-400'} />}
            value={totalJobs}
            label="Jobs"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stats;