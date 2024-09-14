"use client"
import React, { useState, useRef, useEffect } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Switch, 
  SelectChangeEvent, 
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '@/redux/Hooks';
import { editjob, postjob, resetSuccess, resetCurrentJob, resetError, singlejob } from '@/redux/slices/JobSlice';
import { RootState } from '@/redux/Store';

interface Props {
    page: boolean
    id?: string
}

const JobForm = ({ page, id}: Props) => {
    const postStatus = useAppSelector((state: RootState) => state.jobs);
    const dispatch = useAppDispatch()
    console.log(postStatus.currentJob)
    useEffect(() => {
        if(!id){
            dispatch(resetCurrentJob())
        }
    })

    useEffect(() => {
        const fetchUser = async (_id: string) => {
            await dispatch(singlejob(_id))
            console.log("requested")
            dispatch(resetSuccess())
        }
        if (id){
            fetchUser(id)
        }

    }, [])


    const [jobType, setJobType] = useState<string>(postStatus.currentJob?.type || "");
    const [status, setStatus] = useState<boolean>(postStatus.currentJob?.status || true)
    const [requirements, setRequirements] = useState<string[]>(postStatus.currentJob?.requirements || []);
    const [responsibilities, setResponsibilities] = useState<string[]>(postStatus.currentJob?.responsibilities || []);

    const titleRef = useRef<HTMLInputElement>(null);
    const departmentRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const minSalaryRef = useRef<HTMLInputElement>(null);
    const maxSalaryRef = useRef<HTMLInputElement>(null);
    const jobDescriptionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (
            titleRef.current && departmentRef.current &&
            locationRef.current && minSalaryRef.current &&
            maxSalaryRef.current && jobDescriptionRef.current 
        ){
            if(postStatus.currentJob){
                titleRef.current.value = postStatus.currentJob.title;
                departmentRef.current.value = postStatus.currentJob.department;
                locationRef.current.value = postStatus.currentJob.location;
                minSalaryRef.current.value = String(postStatus.currentJob.minSalary);
                maxSalaryRef.current.value = String(postStatus.currentJob.maxSalary);
                jobDescriptionRef.current.value = postStatus.currentJob.description;
        
                setJobType(postStatus.currentJob.type);
                setStatus(postStatus.currentJob.status);
                setRequirements(postStatus.currentJob.requirements);
                setResponsibilities(postStatus.currentJob.responsibilities);
            }else{

                titleRef.current.value = "";
                departmentRef.current.value = "";
                locationRef.current.value = "";
                minSalaryRef.current.value = "";
                maxSalaryRef.current.value = "";
                jobDescriptionRef.current.value = "";
        
                setJobType("");
                setStatus(true);
                setRequirements([]);
                setResponsibilities([]);
            }

        }
        dispatch(resetError());
    }, [postStatus.currentJob, dispatch]);  

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

    const handleSubmit = async () => {
        if (
            titleRef.current && departmentRef.current &&
            locationRef.current && minSalaryRef.current &&
            maxSalaryRef.current && jobDescriptionRef.current 
        ){
            const data: any = {
                title: titleRef.current.value,
                department: departmentRef.current.value,
                type: jobType,
                location: locationRef.current.value,
                minSalary: parseInt(minSalaryRef.current.value),
                maxSalary: parseInt(maxSalaryRef.current.value),
                description: jobDescriptionRef.current.value,
                status: status,
                requirements: requirements,
                responsibilities: responsibilities
            }

            if(page){
                await dispatch(postjob(data))
            }else{
                if (id){
                    await dispatch(editjob({id: id, job: data}))
                }
            }
        }
    }
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
        <form className="space-y-6 dark:bg-gray-800 dark:text-white">
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
            sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    '& fieldset': {
                        ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                        borderColor: 'currentColor',
                    },
                },
                '& .MuiInputBase-input': {
                    color: 'currentColor',
                },
            }}
            fullWidth
            label="Job Title"
            variant="outlined"
            className="bg-white dark:bg-gray-700"
            inputRef={titleRef}
            />
    
            <div>
                <Select<string>
                    fullWidth
                    displayEmpty
                    variant="outlined"
                    className="bg-white dark:bg-gray-700"
                    sx={{
                        ...selectSx,
                        color: 'currentColor',
                        '& .MuiOutlinedInput-notchedOutline': {
                            ...selectSx['& .MuiOutlinedInput-notchedOutline'],
                            borderColor: 'currentColor',
                        },
                    }}
                    value={jobType}
                    onChange={handleJobTypeChange}
                    renderValue={(selected) => {
                    if (selected === '') {
                        return <em className="text-gray-400 dark:text-gray-500">Job Type</em>;
                    }
                    return selected;
                    }}
                >
                    <MenuItem disabled value="">
                    <em>Job Type</em>
                    </MenuItem>
                    <MenuItem value="Full-Time">Full Time</MenuItem>
                    <MenuItem value="Part-Time">Part Time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                </Select>
            </div>
            
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
            sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    '& fieldset': {
                        ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                        borderColor: 'currentColor',
                    },
                },
                '& .MuiInputBase-input': {
                    color: 'currentColor',
                },
            }}
            fullWidth
            label="Location"
            variant="outlined"
            className="bg-white dark:bg-gray-700"
            inputRef={locationRef}
            />
            
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
            sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    '& fieldset': {
                        ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                        borderColor: 'currentColor',
                    },
                },
                '& .MuiInputBase-input': {
                    color: 'currentColor',
                },
            }}
            fullWidth
            label="Department"
            variant="outlined"
            className="bg-white dark:bg-gray-700"
            inputRef={departmentRef}
            />
            
            <div className="flex space-x-4">
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
                sx={{
                    ...inputSx,
                    '& .MuiOutlinedInput-root': {
                        ...inputSx['& .MuiOutlinedInput-root'],
                        '& fieldset': {
                            ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                            borderColor: 'currentColor',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'currentColor',
                    },
                }}
                label="Min Salary"
                variant="outlined"
                className="bg-white dark:bg-gray-700 flex-1"
                type="number"
                inputRef={minSalaryRef}
            />
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
                sx={{
                    ...inputSx,
                    '& .MuiOutlinedInput-root': {
                        ...inputSx['& .MuiOutlinedInput-root'],
                        '& fieldset': {
                            ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                            borderColor: 'currentColor',
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'currentColor',
                    },
                }}
                label="Max Salary"
                variant="outlined"
                className="bg-white dark:bg-gray-700 flex-1"
                type="number"
                inputRef={maxSalaryRef}
            />
            </div>
            
            <TextField
            InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
            sx={{
                ...inputSx,
                '& .MuiOutlinedInput-root': {
                    ...inputSx['& .MuiOutlinedInput-root'],
                    '& fieldset': {
                        ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                        borderColor: 'currentColor',
                    },
                },
                '& .MuiInputBase-input': {
                    color: 'currentColor',
                },
            }}
            fullWidth
            label="Job Description"
            variant="outlined"
            multiline
            rows={4}
            className="bg-white dark:bg-gray-700"
            inputRef={jobDescriptionRef}
            />
    
            <div className="space-y-2">
            <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md shadow">
                <span>Requirements</span>
                <Button className="min-w-0 p-1" onClick={() => addField('requirements')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </Button>
            </div>
            {requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                <TextField
                    sx={{
                        ...inputSx,
                        '& .MuiOutlinedInput-root': {
                            ...inputSx['& .MuiOutlinedInput-root'],
                            '& fieldset': {
                                ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                                borderColor: 'currentColor',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'currentColor',
                        },
                    }}
                    fullWidth
                    variant="outlined"
                    className="bg-white dark:bg-gray-700"
                    value={req}
                    onChange={(e) => handleFieldChange(index, e.target.value, 'requirements')}
                    onBlur={() => handleFieldBlur(index, 'requirements')}
                />
                <IconButton onClick={() => removeField(index, 'requirements')} color="error">
                    <DeleteIcon className="dark:text-red-400" />
                </IconButton>
                </div>
            ))}
            </div>
    
            <div className="space-y-2">
            <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md shadow">
                <span>Responsibilities</span>
                <Button className="min-w-0 p-1" onClick={() => addField('responsibilities')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-blue-500 dark:text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                </Button>
            </div>
            {responsibilities.map((resp, index) => (
                <div key={index} className="flex items-center space-x-2">
                <TextField
                InputLabelProps={{...inputLabelProps, className: 'dark:text-gray-300'}}
                    sx={{
                        ...inputSx,
                        '& .MuiOutlinedInput-root': {
                            ...inputSx['& .MuiOutlinedInput-root'],
                            '& fieldset': {
                                ...inputSx['& .MuiOutlinedInput-root']['& fieldset'],
                                borderColor: 'currentColor',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'currentColor',
                        },
                    }}
                    fullWidth
                    variant="outlined"
                    className="bg-white dark:bg-gray-700"
                    value={resp}
                    onChange={(e) => handleFieldChange(index, e.target.value, 'responsibilities')}
                    onBlur={() => handleFieldBlur(index, 'responsibilities')}
                />
                <IconButton onClick={() => removeField(index, 'responsibilities')} color="error">
                    <DeleteIcon className="dark:text-red-400" />
                </IconButton>
                </div>
            ))}
            </div>
            <div className="flex md:flex-row md:items-center md:justify-between gap-2 flex-col-reverse">
                <div>
                {postStatus.isError && <p className='text-red-700 dark:text-red-400 mb-2'>{postStatus.error}</p>}
                {postStatus.isSuccess && <p className='text-blue-600 dark:text-blue-400 mb-2'>Job Posted Successfully</p>}
                    <Button variant="contained" disabled={postStatus.isLoading} onClick={handleSubmit} color="primary" className="px-8 py-2 dark:bg-blue-600 dark:text-white">
                        {
                            postStatus.isLoading?
                            <CircularProgress size={24} className="text-white dark:text-gray-200"/>
                            :
                            page ? "Post" : "Update"
                        }
                    </Button>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">Active</span>
                    <Switch 
                        color="primary" 
                        checked={status} 
                        onChange={() => { setStatus(!status)}} 
                        className="dark:text-blue-400"
                    />
                </div>
            </div>
        </form>
    );
};

export default JobForm;