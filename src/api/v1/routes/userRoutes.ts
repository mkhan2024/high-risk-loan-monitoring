import { Router } from 'express';
import { getUser, setUserRole } from '../controllers/userController';

const router = Router();

router.get('/:uid', getUser);
router.post('/set-role', setUserRole);

export default router;