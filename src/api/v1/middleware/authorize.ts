import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors/errors';
import { ERROR_CODES } from '../../constants/errorCodes';

interface AuthorizationOptions {
    roles: string[];
}

const authorize = (options: AuthorizationOptions) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = res.locals.role;

        if (!userRole) {
            throw new AuthorizationError('Forbidden: No role assigned', 'INSUFFICIENT_ROLE');
        }

        if (options.roles.includes(userRole)) {
            return next();
        }

        throw new AuthorizationError('Forbidden: Insufficient role', 'INSUFFICIENT_ROLE');
    };
};

export default authorize;