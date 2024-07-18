import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
import notFound from './app/config/middlewares/notfound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
