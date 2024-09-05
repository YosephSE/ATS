"use client"
import React, { useState, useRef } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Switch, 
  SelectChangeEvent, 
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    page: "Post" | "Edit"
}

const JobForm = (page: Props) => {
  const [jobType, setJobType] = useState<string>('');
  const [requirements, setRequirements] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);

  const jobTitleRef = useRef<HTMLInputElement>(null);
  const DepartmentRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const minSalaryRef = useRef<HTMLInputElement>(null);
  const maxSalaryRef = useRef<HTMLInputElement>(null);
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleJobTypeChange = (event: SelectChangeEvent<string>) => {
    setJobType(event.target.value);
  };

  const addField = (type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      setRequirements([...requirements, '']);
    } else {
      setResponsibilities([...responsibilities, '']);
    }
  };

  const handleFieldChange = (index: number, value: string, type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      const newRequirements = [...requirements];
      newRequirements[index] = value;
      setRequirements(newRequirements);
    } else {
      const newResponsibilities = [...responsibilities];
      newResponsibilities[index] = value;
      setResponsibilities(newResponsibilities);
    }
  };

  const handleFieldBlur = (index: number, type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      if (requirements[index].trim() === '') {
        const newRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(newRequirements);
      }
    } else {
      if (responsibilities[index].trim() === '') {
        const newResponsibilities = responsibilities.filter((_, i) => i !== index);
        setResponsibilities(newResponsibilities);
      }
    }
  };

  const removeField = (index: number, type: 'requirements' | 'responsibilities') => {
    if (type === 'requirements') {
      const newRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(newRequirements);
    } else {
      const newResponsibilities = responsibilities.filter((_, i) => i !== index);
      setResponsibilities(newResponsibilities);
    }
  };

  const selectSx = {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F6CF6',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'blue',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'blue',
    },
  };

  const inputSx = {
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
  };

  const inputLabelProps = {
    shrink: true
  }

  return (            
            <form className="space-y-6">
                <TextField
                InputLabelProps={inputLabelProps}
                sx={inputSx}
                fullWidth
                label="Job Title"
                variant="outlined"
                className="bg-white"
                inputRef={jobTitleRef}
                />

                <div>
                    <Select<string>
                        fullWidth
                        displayEmpty
                        variant="outlined"
                        className="bg-white"
                        sx={selectSx}
                        value={jobType}
                        onChange={handleJobTypeChange}
                        renderValue={(selected) => {
                        if (selected === '') {
                            return <em className="text-gray-400">Job Type</em>;
                        }
                        return selected;
                        }}
                    >
                        <MenuItem disabled value="">
                        <em>Job Type</em>
                        </MenuItem>
                        <MenuItem value="full-time">Full Time</MenuItem>
                        <MenuItem value="part-time">Part Time</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                    </Select>
                </div>
                
                <TextField
                InputLabelProps={inputLabelProps}
                sx={inputSx}
                fullWidth
                label="Location"
                variant="outlined"
                className="bg-white"
                inputRef={locationRef}
                />
                
                <TextField
                InputLabelProps={inputLabelProps}
                sx={inputSx}
                fullWidth
                label="Department"
                variant="outlined"
                className="bg-white"
                inputRef={DepartmentRef}
                />
                
                <div className="flex space-x-4">
                <TextField
                InputLabelProps={inputLabelProps}
                    sx={inputSx}
                    label="Min Salary"
                    variant="outlined"
                    className="bg-white flex-1"
                    type="number"
                    inputRef={minSalaryRef}
                />
                <TextField
                InputLabelProps={inputLabelProps}
                    sx={inputSx}
                    label="Max Salary"
                    variant="outlined"
                    className="bg-white flex-1"
                    type="number"
                    inputRef={maxSalaryRef}
                />
                </div>
                
                <TextField
                InputLabelProps={inputLabelProps}
                sx={inputSx}
                fullWidth
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                className="bg-white"
                inputRef={jobDescriptionRef}
                />

                <div className="space-y-2">
                <div className="flex items-center justify-between bg-white p-3 rounded-md shadow">
                    <span>Requirements</span>
                    <Button className="min-w-0 p-1" onClick={() => addField('requirements')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    </Button>
                </div>
                {requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                    <TextField
                        sx={inputSx}
                        fullWidth
                        variant="outlined"
                        className="bg-white"
                        value={req}
                        onChange={(e) => handleFieldChange(index, e.target.value, 'requirements')}
                        onBlur={() => handleFieldBlur(index, 'requirements')}
                    />
                    <IconButton onClick={() => removeField(index, 'requirements')} color="error">
                        <DeleteIcon />
                    </IconButton>
                    </div>
                ))}
                </div>

                <div className="space-y-2">
                <div className="flex items-center justify-between bg-white p-3 rounded-md shadow">
                    <span>Responsibilities</span>
                    <Button className="min-w-0 p-1" onClick={() => addField('responsibilities')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    </Button>
                </div>
                {responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center space-x-2">
                    <TextField
                    InputLabelProps={inputLabelProps}
                        sx={inputSx}
                        fullWidth
                        variant="outlined"
                        className="bg-white"
                        value={resp}
                        onChange={(e) => handleFieldChange(index, e.target.value, 'responsibilities')}
                        onBlur={() => handleFieldBlur(index, 'responsibilities')}
                    />
                    <IconButton onClick={() => removeField(index, 'responsibilities')} color="error">
                        <DeleteIcon />
                    </IconButton>
                    </div>
                ))}
                </div>
                <div className="flex md:flex-row md:items-center md:justify-between gap-2 flex-col-reverse">
                <Button variant="contained" color="primary" className="px-8 py-2">
                    Post
                </Button>
                <div className="flex items-center">
                    <span className="mr-2">Active</span>
                    <Switch color="primary" />
                </div>
                </div>
            </form>
    );
};

export default JobForm;