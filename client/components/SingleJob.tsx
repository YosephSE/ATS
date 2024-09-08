import { useAppDispatch, useAppSelector } from '@/redux/Hooks'
import { RootState } from '@/redux/store'
import { BookmarkBorder } from '@mui/icons-material'
import { CardContent, Button, Card, IconButton, CircularProgress } from '@mui/material'
import { apply } from '@/redux/slices/ApplicationSlice'
import React from 'react'

const SingleJob = () => {
    const currentState = useAppSelector((state: RootState) => state.applications)
    const currentJob = useAppSelector((state: RootState) => state.jobs.currentJob)
    const dispatch = useAppDispatch()
    const handleApply = async () => {
        await dispatch(apply(currentJob?._id))
    }
    return (
        <div className='w-full'>
            <Card className="mb-4">
                <CardContent className='rounded-lg shadow-lg'>
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2 flex-col">
                        <h1 className="text-2xl font-bold">
                            {currentJob?.title}
                        </h1>
                        <p className="text-gray-500">
                            {currentJob?.location}
                        </p>
                        <h2 className='text-xl font-bold mt-4'>Department: <span className='text-base font-semibold'>{currentJob?.department}</span></h2>
                        <h2 className='text-xl font-bold'>Job Type: <span className='text-base font-semibold'>{currentJob?.type}</span></h2>
                        <h2 className='text-xl font-bold'>Job Description</h2>
                        <p className="ml-2">
                            {currentJob?.description}
                        </p>
                        <h2 className='text-xl font-bold'>Job Requirement</h2>
                        <ul className="list-disc list-inside ml-2">
                            {currentJob?.requirements?.map((requirement, index) => (
                                <li key={index}>{requirement}</li>
                            ))}
                        </ul>
                        <h2 className='text-xl font-bold'>Job Responsibility</h2>
                        <ul className="list-disc list-inside ml-2">
                            {currentJob?.responsibilities.map((responsibility, index) => (
                                <li key={index}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col items-end">
                    <IconButton>
                        <BookmarkBorder />
                    </IconButton>
                    <Button onClick={handleApply} variant="contained" color="primary" className="mt-2">
                    {
                        currentState?.isLoading ? 
                        (
                            <CircularProgress size={24} className="text-white"/>
                        ) 
                        : 
                        (
                            'Apply'
                        )
                    }
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className='rounded-lg shadow-lg'>
                <CardContent>
                <h2 className="text-lg font-semibold">
                    Salary Range
                </h2>
                <h3 className="text-xl font-bold text-blue-500">
                    {`${currentJob?.minSalary} birr - ${currentJob?.maxSalary} birr per month`}
                </h3>
                </CardContent>
            </Card>
            </div>
    )
}

export default SingleJob
