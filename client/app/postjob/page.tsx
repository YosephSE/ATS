import React from 'react';
import { TextField, Select, MenuItem, Button, Switch } from '@mui/material';

const PostJob = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Post Job</h2>
      
      <form className="space-y-6">
        <div>
          <TextField
            sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: '#0F6CF6',
                    },
                    '&:hover fieldset': {
                    borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    },
                },
            }}
            fullWidth
            label="Title"
            variant="outlined"
            className="bg-white"
            InputLabelProps={{
                shrink: true,
            }}
          />
        </div>
        
        <div>
          <Select
            fullWidth
            displayEmpty
            variant="outlined"
            className="bg-white"
          >
            <MenuItem disabled value="">
              <em>Job Type</em>
            </MenuItem>
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
          </Select>
        </div>
        
        <div>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            className="bg-white"
            sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: '#0F6CF6',
                    },
                    '&:hover fieldset': {
                    borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    },
                },
            }}
            InputLabelProps={{
                shrink: true,
            }}
          />
        </div>
        
        <div>
          <TextField
            fullWidth
            label="Department"
            variant="outlined"
            className="bg-white"
            sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: '#0F6CF6',
                    },
                    '&:hover fieldset': {
                    borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    },
                },
            }}
            InputLabelProps={{
                shrink: true,
            }}
          />
        </div>
        
        <div>
          <TextField
            fullWidth
            label="Job description"
            variant="outlined"
            multiline
            rows={4}
            className="bg-white"
            sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                    borderColor: '#0F6CF6',
                    },
                    '&:hover fieldset': {
                    borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                    borderColor: 'blue',
                    },
                },
            }}
            InputLabelProps={{
                shrink: true,
            }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-white p-3 rounded-md shadow">
            <span>Requirements</span>
            <Button className="min-w-0 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between bg-white p-3 rounded-md shadow">
            <span>Responsibilities</span>
            <Button className="min-w-0 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button variant="contained" color="primary" className="px-8 py-2">
            Post
          </Button>
          <div className="flex items-center">
            <span className="mr-2">Active</span>
            <Switch color="primary" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;