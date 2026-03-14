import { Request, Response } from 'express';
import { auth } from '../../../config/firebaseConfig';
import { HTTP_STATUS } from '../../../constants/httpConstants';

export const getUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const userRecord = await auth.getUser(uid);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: {
                uid: userRecord.uid,
                email: userRecord.email,
                role: userRecord.customClaims?.role || null,
            },
        });
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'User not found' });
    }
};

export const setUserRole = async (req: Request, res: Response) => {
    try {
        const { uid, role } = req.body;
        await auth.setCustomUserClaims(uid, { role });
        res.status(HTTP_STATUS.OK).json({ success: true, message: `Role ${role} set for user` });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Failed to set role' });
    }
};