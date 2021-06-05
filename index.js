import dotenv from 'dotenv';
import express from 'express';

// import all resource routers
import accountsRouter from './api/accounts';
import contactsRouter from './api/contacts';
import notificationsRouter from './api/notifcations';
import retailersRouter from './api/retailers';
import usersRouter from './api/users';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use('/api/accounts', accountsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/retailers', retailersRouter);
app.use('/api/users', usersRouter);

// Run the server
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});