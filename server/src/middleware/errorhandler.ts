import { Request, Response, NextFunction } from "express";
import ErrorLog from "../models/errorLog"; // Adjust the path as necessary

const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Save the error to the database
  try {
    const errorLog = new ErrorLog({
      name: err.name,
      message: err.message,
      stack: err.stack,
      status: err.status,
      additionalInfo: {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
      },
    });

    await errorLog.save();
  } catch (dbError) {
    console.error("Failed to save error log to the database", dbError);
  }

  // Respond to the client
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors,
    });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  if (err.status === 404) {
    return res.status(404).json({
      message: "Resource not found",
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token has expired, please login again",
    });
  }

  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `Duplicate value for field: ${field}`,
    });
  }

  if (
    err.errors &&
    Object.values(err.errors).some((error: any) => error.kind === "required")
  ) {
    return res.status(400).json({
      message: "Missing required fields",
      errors: err.errors,
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      message: "Too many requests, please try again later",
    });
  }

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File size too large, please upload a smaller file",
    });
  }

  if (err.name === "MongoNetworkError") {
    return res.status(503).json({
      message: "Database connection error, please try again later",
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

export default errorHandler;
