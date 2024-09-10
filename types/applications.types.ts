import { Jobs } from "./job.types"


interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    pdf: string
}
export interface Application{
    _id: string
    jobId: Jobs
    candidateId: User
    status: string
    AIScore: number
    createdAt: Date
}