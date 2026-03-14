import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/errors';
import { errorResponse } from '../models/responseModel';
import { HTTP_STATUS } from '../../../constants/httpConstants';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(
            errorResponse(err.message, err.code)
        );
    }

    console.error(err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        errorResponse('An unexpected error occurred', 'UNKNOWN_ERROR')
    );
};

export default errorHandler;