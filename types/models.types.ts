import { Document } from "mongoose";

interface IErrorLog extends Document {
    name: string;
    message: string;
    stack?: string;
    status?: number;
    additionalInfo?: any;
    createdAt: Date;
  }


export { IErrorLog };