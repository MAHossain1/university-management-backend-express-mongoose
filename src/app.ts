import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/config/middlewares/globalErrorHandler';
import notFound from './app/config/middlewares/notfound';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
