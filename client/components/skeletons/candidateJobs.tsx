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
      <Box className="flex h-screen bg-gray-100 dark:bg-gray-800 p-3">
        {/* Left sidebar */}
        <Box className="w-72 mr-3">
          <Typography variant="h6" className="mb-2">
            <Skeleton width={100} />
          </Typography>
          <List>
            {[...Array(4)].map((_, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Card className="w-full mb-2 dark:bg-gray-700">
                    <CardContent>
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        className="mb-1"
                      />
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={20}
                        className="mb-1"
                      />
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={20}
                        className="mb-1"
                      />
                      <Box className="flex justify-between items-center">
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
        <Box className="flex-grow">
          <Typography variant="h5" className="mb-3">
            <Skeleton width={100} />
          </Typography>
          <Card className="dark:bg-gray-700">
            <CardContent>
              <Skeleton
                variant="text"
                width="40%"
                height={32}
                className="mb-2"
              />
              <Skeleton
                variant="text"
                width="20%"
                height={24}
                className="mb-3"
              />

              {[
                "Department",
                "Job Type",
                "Job Description",
                "Job Requirement",
                "Job Responsibility",
              ].map((item, index) => (
                <Box key={index} className="mb-3">
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

              <Box className="flex justify-between items-center mt-3">
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
