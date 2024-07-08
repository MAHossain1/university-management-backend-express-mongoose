import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.routes';
import { UserRoutes } from './modules/user/user.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
