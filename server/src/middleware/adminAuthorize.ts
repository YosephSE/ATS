import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
    user?: any;
}

const adminAuthorize = (requiredRole: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
      if (req.user?.role !== requiredRole) {
        return res.status(403).send("You do not have permission to access this resource.");
      }
      next();
    };
  };
  
  export default adminAuthorize;
  