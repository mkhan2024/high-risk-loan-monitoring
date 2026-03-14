export interface Loan {
    id: number;
    applicant: string;
    amount: number;
    status: string;
    createdAt: string;
}

let loans: Loan[] = [
    { id: 1, applicant: "John Smith", amount: 50000, status: "under_review", createdAt: "2025-01-10T10:00:00.000Z" },
    { id: 3, applicant: "Michael Chen", amount: 500000, status: "pending", createdAt: "2025-01-05T10:00:00.000Z" },
    { id: 4, applicant: "Emily Williams", amount: 1000000, status: "flagged", createdAt: "2025-01-03T10:00:00.000Z" },
    { id: 5, applicant: "Test User", amount: 75000, status: "pending", createdAt: "2025-01-01T10:00:00.000Z" },
];

let nextId = 6;

export const getAllLoans = (): Loan[] => loans;
export const getLoanById = (id: number): Loan | undefined => loans.find(l => l.id === id);
export const createLoan = (applicant: string, amount: number): Loan => {
    const newLoan: Loan = { id: nextId++, applicant, amount, status: "pending", createdAt: new Date().toISOString() };
    loans.push(newLoan);
    return newLoan;
};
export const updateLoan = (id: number, updates: Partial<Loan>): Loan | undefined => {
    const index = loans.findIndex(l => l.id === id);
    if (index === -1) return undefined;
    loans[index] = { ...loans[index], ...updates };
    return loans[index];
};
export const deleteLoan = (id: number): boolean => {
    const index = loans.findIndex(l => l.id === id);
    if (index === -1) return false;
    loans.splice(index, 1);
    return true;
};