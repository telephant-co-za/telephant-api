import dotenv from 'dotenv';
import express from 'express';

// connection to database
import './db';
import './seedData';

// import all resource routers
import accountsRouter from './api/accounts';
import airtimeRouter from './api/airtime';
import contactsRouter from './api/contacts/contactsRouter';
import notificationsRouter from './api/notifications';
import retailersRouter from './api/retailers';
import usersRouter from './api/users';

import wrongPath from './functions/wrongPath';
const prepareErrors = require('./functions/prepareErrors');
const prepareOutput = require('./functions/prepareOutput');

dotenv.config();
const port = process.env.PORT;
const app = express();

app
.use(express.json())

.use('/api/accounts', accountsRouter, prepareOutput)
.use('/api/airtime', airtimeRouter, prepareOutput)
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