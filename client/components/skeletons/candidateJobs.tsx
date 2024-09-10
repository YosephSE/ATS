import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import Header from "../Header";

const JobListingLoadingSkeleton = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5", p: 3 }}>
        {/* Left sidebar */}
        <Box sx={{ width: 300, mr: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Skeleton width={100} />
          </Typography>
          <List>
            {[...Array(4)].map((_, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Card sx={{ width: "100%", mb: 2 }}>
                    <CardContent>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Skeleton variant="text" width="30%" height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
                {index < 3 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            <Skeleton width={100} />
          </Typography>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="20%" height={24} sx={{ mb: 3 }} />

              {[
                "Department",
                "Job Type",
                "Job Description",
                "Job Requirement",
                "Job Responsibility",
              ].map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6">
                    <Skeleton width={150} />
                  </Typography>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                  {item === "Job Requirement" ||
                  item === "Job Responsibility" ? (
                    <>
                      <Skeleton variant="text" width="70%" />
                      <Skeleton variant="text" width="60%" />
                    </>
                  ) : null}
                </Box>
              ))}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="rectangular" width={100} height={36} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default JobListingLoadingSkeleton;
