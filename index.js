import dotenv from 'dotenv';
import express from 'express';
import transactionsRouter from './api/transactions';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use('/api/transactions', transactionsRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});