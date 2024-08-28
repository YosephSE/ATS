import {Request, Response, NextFunction} from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);  


    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.errors,
        });
    }

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            message: 'Invalid ID format',
        });
    }

    if (err.status === 404) {

        return res.status(404).json({
            message: 'Resource not found',
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: 'Unauthorized access',
        });
    }

    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
}

export default errorHandler;
