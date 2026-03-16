import request from 'supertest';
import app from '../../../../src/app';
import { auth } from '../../../../src/config/firebaseConfig';

jest.mock('../../../../src/config/firebaseConfig');

describe('Loan Routes Integration', () => {
    it('should return 401 when no token provided', async () => {
        const response = await request(app).get('/api/v1/loans');
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            success: false,
            error: {
                message: 'Unauthorized: No token provided',
                code: 'TOKEN_NOT_FOUND',
            },
            timestamp: expect.any(String),
        });
    });

    it('should return 403 when insufficient role (officer trying to create)', async () => {
        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: 'officer-uid-001',
            role: 'officer',
        });

        const response = await request(app)
            .post('/api/v1/loans')
            .set('Authorization', 'Bearer officer-token')
            .send({ applicant: 'Test', amount: 100 });

        expect(response.status).toBe(403);
        expect(response.body.error.code).toBe('INSUFFICIENT_ROLE');
    });
});
