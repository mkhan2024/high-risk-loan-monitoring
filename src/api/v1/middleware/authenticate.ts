import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../config/firebaseConfig';
import { AuthenticationError } from '../errors/errors';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AuthenticationError('Unauthorized: No token provided', 'TOKEN_NOT_FOUND');
    }

    const idToken = authHeader.split('Bearer ')[1];

    // Mock token support for demo / video / Bruno screenshots
    if (idToken === 'officer-token-abc123') {
        res.locals.uid = 'officer-uid-001';
        res.locals.role = 'officer';
        return next();
    }

    if (idToken === 'manager-token-def456') {
        res.locals.uid = 'manager-uid-002';
        res.locals.role = 'manager';
        return next();
    }

    if (idToken === 'admin-token-ghi789') {
        res.locals.uid = 'admin-uid-003';
        res.locals.role = 'admin';
        return next();
    }

    // Real Firebase verification for production
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role || 'user';
        next();
    } catch (error) {
        throw new AuthenticationError('Unauthorized: Invalid token', 'TOKEN_INVALID');
    }
};

export default authenticate;