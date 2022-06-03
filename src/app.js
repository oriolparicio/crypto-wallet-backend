// Libraries
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import dotenv from 'dotenv';

// Router
import authRouter from './routes/authRouter.js';

dotenv.config();

// 1) MIDDLEWARES
const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

app.use(compression());
app.use(helmet());

// 2) ROUTES
app.use(`/api/auth`, authRouter);

// Handle undefined routes
app.all('*', (req, res, next) => {
  throw new Error('404: Not found');
});

// 3) Start the server (index.js)
export default app;
