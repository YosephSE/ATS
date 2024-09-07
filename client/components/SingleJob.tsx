import { useAppSelector } from '@/redux/Hooks'
import { RootState } from '@/redux/store'
import { BookmarkBorder } from '@mui/icons-material'
import { CardContent, Button, Card, IconButton } from '@mui/material'
import React from 'react'

const SingleJob = () => {
    const currentJob = useAppSelector((state: RootState) => state.jobs.currentJob)
    return (
        <div className='w-full'>
            <Card className="mb-4">
                <CardContent>
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
                        <h2 className='text-xl font-bold'>Job Requirment</h2>
                        <ul className="list-disc list-inside ml-2">
                            {currentJob?.requirements?.map((requirement) => (
                                <li>{requirement}</li>
                            ))}
                        </ul>
                        <h2 className='text-xl font-bold'>Job Responsibility</h2>
                        <ul className="list-disc list-inside ml-2">
                            {currentJob?.responsibilities.map((responsibility) => (
                                <li>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col items-end">
                    <IconButton>
                        <BookmarkBorder />
                    </IconButton>
                    <Button variant="contained" color="primary" className="mt-2">
                        Apply
                    </Button>
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card>
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
