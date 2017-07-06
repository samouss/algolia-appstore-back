import express from 'express';
import bodyParser from 'body-parser';
import { API_VERSION } from 'configuration';
import apps from './apps';

const app = express();
const port = process.env.PORT || 8080;
const basePath = `/api/${API_VERSION}`;

// Middlewares
app.use(bodyParser.json());

// Router
app.use(`${basePath}/apps`, apps);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ name: 'NotFound' });
});

app.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
