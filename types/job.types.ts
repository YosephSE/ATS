export interface Jobs{
    _id: string
    title: string
    location: string
    department: string
    type: string
    status: boolean
    description: string
    minSalary: number
    maxSalary: number
    requirements: string[]
    responsibilities: string[]
    applications: number
    postedBy: {
        firstName: string
        lastName: string
        email: string
    }
}

export interface JobsSlice {
    allJobs: Jobs[] | null;
    activeJobs: Jobs[] | null;
    currentJob: Jobs | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}