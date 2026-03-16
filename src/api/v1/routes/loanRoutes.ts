import { Router } from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import {
    getLoans,
    getLoan,
    createLoanApplication,
    updateLoanApplication,
    deleteLoanApplication,
} from '../controllers/loanController';

const router = Router();

// Health is public (no middleware) - already in app.ts
router.get('/', authenticate, authorize({ roles: ['officer', 'manager', 'admin'] }), getLoans);
router.get('/:id', authenticate, authorize({ roles: ['officer', 'manager', 'admin'] }), getLoan);

router.post('/', authenticate, authorize({ roles: ['manager', 'admin'] }), createLoanApplication);
router.put('/:id', authenticate, authorize({ roles: ['manager', 'admin'] }), updateLoanApplication);
router.delete('/:id', authenticate, authorize({ roles: ['admin'] }), deleteLoanApplication);

export default router;