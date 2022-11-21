import express, { Express } from 'express';
import dotenv from 'dotenv';
import { router } from './routes/routes.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use('/', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
