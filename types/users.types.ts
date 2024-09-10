// import { Request } from 'express';

// export interface CustomRequest extends Request {
//     user?: any;
// }

export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface TokenPayload{
    token: string
}
export interface RegisterUserPayload {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface ContactPayload {
    firstName:string;
    lastName:string;
    phoneNumber: string
    email:string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: "super admin" | "admin" | "user";
    firstTime?: boolean;
}

export interface Education {
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
  }
  
export interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface candidateProfile {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
    linkedIn: string;
    resume: string;
    profilePicture: string
}


interface MyJob{
    title: string,
    type: string,
    location: string,
    department: string,
}

export interface Applications {
    _id: string,
    jobId: MyJob,
    status: "pending"| "approved"| "rejected",
}

export interface UserSlice {
    loggedInUser: User | null;
    applications: Applications[]
    profile: candidateProfile | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}

export interface admin {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: "0987654321"
    approved: boolean
    firstTime: boolean
}

export interface adminProfile{
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    profilePicture: string
    role: string
}

export interface passwordPayload{
    oldPassword: string
    newPassword: string
}
export interface adminUser {
    _id: string;
    name: string;
    email: string;
    role: "super admin" | "admin" | "user";
    firstTime: boolean;
}
export interface adminUserSlice {
    loggedInUser: User | null;
    admins: admin[]
    profile: adminProfile | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}