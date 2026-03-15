import { Request, Response } from 'express';
import authorize from '../../../../src/api/v1/middleware/authorize';
import { AuthorizationError } from '../../../../src/api/v1/errors/errors';

describe('Authorization Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = { locals: {} };
        nextFunction = jest.fn();
    });

    it('should call next() when user has required role', () => {
        mockResponse.locals = { role: 'admin' };
        const options = { roles: ['admin'] };
        const middleware = authorize(options);

        middleware(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
    });

    it('should throw AuthorizationError when role is insufficient', () => {
        mockResponse.locals = { role: 'officer' };
        const options = { roles: ['admin'] };
        const middleware = authorize(options);

        expect(() => middleware(mockRequest as Request, mockResponse as Response, nextFunction))
            .toThrow(AuthorizationError);
        expect(nextFunction).not.toHaveBeenCalled();
    });
});