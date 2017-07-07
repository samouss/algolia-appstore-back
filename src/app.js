import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apps from './apps/routes';

const version = process.env.API_VERSION || 1;
const endpoint = `/api/${version}`;

const app = express();

// Configuration
app.disable('x-powered-by');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Router
app.use(`${endpoint}/apps`, apps);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ name: 'NotFound' });
});

export default app;
