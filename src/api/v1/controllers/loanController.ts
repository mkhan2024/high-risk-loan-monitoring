import { Request, Response } from 'express';
import { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan } from '../models/loanModel';
import { ResourceNotFoundError } from '../errors/errors';
import { ERROR_CODES } from '../../constants/errorCodes';
import { HTTP_STATUS } from '../../constants/httpConstants';

export const getLoans = (req: Request, res: Response) => {
    const loans = getAllLoans();
    res.status(HTTP_STATUS.OK).json({
        message: 'Loan applications retrieved',
        count: loans.length,
        data: loans,
    });
};

export const getLoan = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const loan = getLoanById(id);
    if (!loan) {
        throw new ResourceNotFoundError('Loan application not found', ERROR_CODES.LOAN_NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json({
        message: 'Loan application retrieved',
        data: loan,
    });
};

export const createLoanApplication = (req: Request, res: Response) => {
    const { applicant, amount } = req.body;
    const newLoan = createLoan(applicant, amount);
    res.status(HTTP_STATUS.CREATED).json({
        message: 'Loan application created',
        data: newLoan,
    });
};

export const updateLoanApplication = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const updates = req.body;
    const updated = updateLoan(id, updates);
    if (!updated) {
        throw new ResourceNotFoundError('Loan application not found', ERROR_CODES.LOAN_NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json({
        message: 'Loan application updated',
        data: updated,
    });
};

export const deleteLoanApplication = (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const deleted = deleteLoan(id);
    if (!deleted) {
        throw new ResourceNotFoundError('Loan application not found', ERROR_CODES.LOAN_NOT_FOUND);
    }
    res.status(HTTP_STATUS.OK).json({
        message: 'Loan application deleted',
    });
};