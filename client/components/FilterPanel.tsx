import React, { useState } from 'react';
import { Slider, Button, Checkbox, FormControlLabel, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useAppDispatch } from '@/redux/Hooks';
import { acitvejobs } from '@/redux/slices/JobSlice';

interface JobType {
  fullTime: boolean;
  partTime: boolean;
  contract: boolean;
}

interface Filter {
  priceRange: number[];
  jobTypes: JobType;
  searchTerm: string;
}

const FilterPanel = () => {
  const initialJobTypes: JobType = { fullTime: false, partTime: false, contract: false };
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [jobTypes, setJobTypes] = useState<JobType>(initialJobTypes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTypes({ ...jobTypes, [event.target.name]: event.target.checked });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilters = async({ priceRange, jobTypes, searchTerm }: Filter) => {
    const priceString = `minSalary=${priceRange[0]}&maxSalary=${priceRange[1]}`;
    
    const jobTypesArray = Object.keys(jobTypes).filter(type => jobTypes[type as keyof JobType]);
    const jobString = jobTypesArray.length > 0 ? `type=${jobTypesArray.join(',')}` : '';
    
    const searchTermString = searchTerm ? `description=${searchTerm}` : '';
    
    const queryStrings = [priceString, jobString, searchTermString].filter(Boolean).join('&');
    
    await dispatch(acitvejobs(queryStrings));
  };

  const handleReset = () => {
    setPriceRange([0, 500000]);
    dispatch(acitvejobs(""))
    setSearchTerm('');
  };

  return (
    <div className="px-4 pb-4 rounded-lg max-w-[300px]">
      <InputBase
        placeholder="Search anything"
        startAdornment={<Search className="text-gray-400 mr-2" />}
        className="bg-white rounded-l px-4 py-2 border border-gray-300"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className='my-4'>
        <h6 className='text-lg'>Job Type</h6>
        <FormControlLabel
          control={
            <Checkbox
              checked={jobTypes.fullTime}
              onChange={handleJobTypeChange}
              name="fullTime"
              color="primary"
            />
          }
          label="Full Time"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={jobTypes.partTime}
              onChange={handleJobTypeChange}
              name="partTime"
              color="primary"
            />
          }
          label="Part Time"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={jobTypes.contract}
              onChange={handleJobTypeChange}
              name="contract"
              color="primary"
            />
          }
          label="Contract"
        />
      </div>

      <div className='my-4'>
        <h6 className="text-lg">Price Range</h6>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={500000}
          step={10}
        />
      </div>
      <div className="mt-4">
        <Button onClick={() => handleFilters({ priceRange, jobTypes, searchTerm })} variant="contained" color="primary" fullWidth>
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outlined" color="secondary" fullWidth className="mt-2">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;