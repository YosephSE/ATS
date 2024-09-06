export interface Jobs{
    title: string
    location: string
    department: string
    type: string
    status: boolean
    description: string
    minSalary: number
    maxSalary: number
    requirments: string[]
    responsibilities: string[]
}

export interface JobsSlice {
    allJobs: Jobs[] | null;
    activeJobs: Jobs[] | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}