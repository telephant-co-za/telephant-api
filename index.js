import dotenv from 'dotenv';
import express from 'express';

// import all resource routers
import accountsRouter from './api/accounts';
import contactsRouter from './api/contacts';
import notificationsRouter from './api/notifications';
import retailersRouter from './api/retailers';
import usersRouter from './api/users';

import wrongPath from './functions/wrongPath';
const prepareErrors = require('./functions/prepareErrors');
const prepareOutput = require('./functions/prepareOutput');

dotenv.config();
const app = express();
const port = process.env.PORT;

app
.use('/api/accounts', accountsRouter, prepareOutput)
.use('/api/contacts', contactsRouter, prepareOutput)
.use('/api/notifications', notificationsRouter, prepareOutput)
.use('/api/retailers', retailersRouter, prepareOutput)
.use('/api/users', usersRouter, prepareOutput)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors)

// Run the server
.listen(port, () => {
  console.info(`Server running at ${port}`);
});