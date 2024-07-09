import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
import { StudentRoutes } from './app/modules/student/student.routes';
import { UserRoutes } from './app/modules/user/user.routes';
import notFound from './app/config/middlewares/notfound';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
