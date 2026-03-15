import express from 'express';
import { requestLogger, errorLogger } from './api/v1/middleware/loggingMiddleware';
import errorHandler from './api/v1/middleware/errorHandler';
import authRoutes from './api/v1/routes/authRoutes';
import userRoutes from './api/v1/routes/userRoutes';
import loanRoutes from './api/v1/routes/loanRoutes';
import healthRoutes from './api/v1/routes/healthRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/loans', loanRoutes);
app.use('/api/v1/health', healthRoutes);

app.use(errorLogger);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;