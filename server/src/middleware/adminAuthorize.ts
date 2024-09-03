import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  user?: any;
}
function authorizeRole(requiredRole: String) {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
}

export default authorizeRole;
