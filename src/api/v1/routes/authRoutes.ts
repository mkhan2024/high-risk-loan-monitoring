import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// Mock sign-in to match video demo (real sign-in is frontend + Firebase SDK)
router.post('/signin', (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (password !== 'password123') {
        return res.status(401).json({
            success: false,
            error: { message: 'Invalid credentials', code: 'INVALID_CREDENTIALS' },
            timestamp: new Date().toISOString(),
        });
    }

    let mockToken: string;
    let mockUid: string;

    if (email === 'officer@pixell-river.com') {
        mockToken = 'officer-token-abc123';
        mockUid = 'officer-uid-001';
    } else if (email === 'manager@pixell-river.com') {
        mockToken = 'manager-token-def456';
        mockUid = 'manager-uid-002';
    } else if (email === 'admin@pixell-river.com') {
        mockToken = 'admin-token-ghi789';
        mockUid = 'admin-uid-003';
    } else {
        return res.status(401).json({
            success: false,
            error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            timestamp: new Date().toISOString(),
        });
    }

    res.status(200).json({
        idToken: mockToken,
        email,
        localId: mockUid,
        expiresIn: '3600',
        refreshToken: 'mock-refresh-token',
    });
});

export default router;