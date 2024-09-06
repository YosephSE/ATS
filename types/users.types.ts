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
