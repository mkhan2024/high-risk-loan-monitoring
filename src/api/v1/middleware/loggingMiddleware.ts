import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/combined.log' }),
    ],
});

export const requestLogger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
});

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${err.message} - ${req.method} ${req.url} - Stack: ${err.stack}`);
    next(err);
};