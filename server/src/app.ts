// server/src/app.ts
// Builds the Express app (middleware + routes) without starting it,
// so tests can import the app without opening a port.
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
import router from './routes';

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientUrls,
    credentials: true, // needed for the refresh-token cookie
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (!config.isProduction) app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Welcome to the RICOVERSE API. Try GET /api/v1/health' });
});

app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
