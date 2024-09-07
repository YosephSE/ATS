import { Request } from 'express';

export interface CustomRequest extends Request {
    user?: any;
}

export interface LoginUserPayload {
    email: string;
    password: string;
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
    role: string;
}

interface adminProfile{
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    profilePicture: string
    role: string
}
export interface UserSlice {
    loggedInUser: User | null;
    profile: adminProfile | null
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    error: string | null;
}