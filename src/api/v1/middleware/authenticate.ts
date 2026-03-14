import { Request, Response, NextFunction } from 'express';
import { auth } from '../../config/firebaseConfig';
import { AuthenticationError } from '../errors/errors';
import { ERROR_CODES } from '../../constants/errorCodes';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AuthenticationError('Unauthorized: No token provided', 'TOKEN_NOT_FOUND');
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role || 'user';  // fallback if no role set
        next();
    } catch (error) {
        throw new AuthenticationError('Unauthorized: Invalid token', 'TOKEN_INVALID');
    }
};

export default authenticate;