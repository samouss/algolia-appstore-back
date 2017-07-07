import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { API_VERSION } from 'configuration';
import apps from './apps/routes';

const app = express();
const basePath = `/api/${API_VERSION}`;

// Configuration
app.disable('x-powered-by');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Router
app.use(`${basePath}/apps`, apps);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ name: 'NotFound' });
});

export default app;