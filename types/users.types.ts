import { Request } from 'express';

export interface CustomRequest extends Request {
    user?: any;
}

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
    password: string;
    phoneNumber: string;
    email: string;
    skills: string[];
    education: Education[];
    experience: Experience[];
    linkedIn: string;
    resume: string;
}

export interface UserSlice {
    loggedInUser: User | null;
    profile: candidateProfile | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}

interface adminProfile{
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    profilePicture: string
    role: string
}
export interface adminUserSlice {
    loggedInUser: User | null;
    profile: adminProfile | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}