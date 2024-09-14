import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Skeleton, 
  Card, 
  CardContent
} from '@mui/material';
import Sidebar from '../SideBar';

const LoadingSkeleton = () => {
  return (
    <Box className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar />

      {/* Main content */}
      <Box className="flex-grow p-3 dark:bg-gray-900">
        <Typography variant="h4" className="mb-3">
          <Skeleton width={150} className="dark:bg-gray-700" />
        </Typography>

        {/* Statistics cards */}
        <Grid container spacing={3} className="mb-4">
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className="dark:bg-gray-800">
                <CardContent>
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    className="mb-1 dark:bg-gray-700"
                  />
                  <Skeleton width="60%" className="dark:bg-gray-700" />
                  <Skeleton width="40%" className="dark:bg-gray-700" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className="mb-2">
              <Skeleton width={100} className="dark:bg-gray-700" />
            </Typography>
            <Skeleton
              variant="circular"
              width={200}
              height={200}
              className="dark:bg-gray-700"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className="mb-2">
              <Skeleton width={100} className="dark:bg-gray-700" />
            </Typography>
            <Skeleton
              variant="circular"
              width={200}
              height={200}
              className="dark:bg-gray-700"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;
