import { Request, Response } from 'express';
import authenticate from '../../../../src/api/v1/middleware/authenticate';
import { auth } from '../../../../src/config/firebaseConfig';
import { AuthenticationError } from '../../../../src/api/v1/errors/errors';

jest.mock('../../../../src/config/firebaseConfig');

describe('Authentication Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRequest = { headers: {} };
        mockResponse = { locals: {} };
        nextFunction = jest.fn();
    });

    it('should throw AuthenticationError when no token is provided', async () => {
        await expect(
            authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
        ).rejects.toThrow(AuthenticationError);

        await expect(
            authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
        ).rejects.toMatchObject({
            message: 'Unauthorized: No token provided',
            code: 'TOKEN_NOT_FOUND',
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should throw AuthenticationError when token is invalid', async () => {
        mockRequest.headers = { authorization: 'Bearer invalid-token' };
        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(new Error('Firebase Error: Invalid token'));

        await expect(
            authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
        ).rejects.toThrow(AuthenticationError);

        expect(auth.verifyIdToken).toHaveBeenCalledWith('invalid-token');
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should call next() and set user data when token is valid', async () => {
        mockRequest.headers = { authorization: 'Bearer valid-token' };
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({ uid: 'user123', role: 'officer' });

        await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.locals).toEqual({ uid: 'user123', role: 'officer' });
        expect(nextFunction).toHaveBeenCalled();
    });
});