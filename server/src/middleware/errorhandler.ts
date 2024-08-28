import {Request, Response, NextFunction} from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);  // Log the error stack for debugging purposes

    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        // Handle Mongoose validation error
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.errors,
        });
    }

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        // Handle Mongoose CastError (invalid ObjectId)
        return res.status(400).json({
            message: 'Invalid ID format',
        });
    }

    if (err.status === 404) {
        // Handle not found errors
        return res.status(404).json({
            message: 'Resource not found',
        });
    }

    if (err.name === 'UnauthorizedError') {
        // Handle JWT authentication errors
        return res.status(401).json({
            message: 'Unauthorized access',
        });
    }

    // Default to 500 Internal Server Error
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
}

export default errorHandler;
