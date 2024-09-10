import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Skeleton, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Sidebar from '../SideBar';

const LoadingSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      {/* <Box sx={{ width: 60, bgcolor: '#f0f7ff', p: 1 }}>
        <List>
          {[...Array(5)].map((_, index) => (
            <ListItem key={index} sx={{ mb: 2 }}>
              <ListItemIcon>
                <Skeleton variant="circular" width={24} height={24} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box> */}

      <Sidebar />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          <Skeleton width={150} />
        </Typography>

        {/* Statistics cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="circular" width={40} height={40} sx={{ mb: 1 }} />
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <Skeleton width={100} />
            </Typography>
            <Skeleton variant="circular" width={200} height={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <Skeleton width={100} />
            </Typography>
            <Skeleton variant="circular" width={200} height={200} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;