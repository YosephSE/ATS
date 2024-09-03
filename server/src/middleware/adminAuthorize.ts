import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  user?: any;
}

const adminAuthorize = (allowedRoles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res
        .status(403)
        .json({
          message: "You do not have permission to access this resource.",
        });
    }
    next();
  };
};

export default adminAuthorize;
