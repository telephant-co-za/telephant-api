import dotenv from 'dotenv';
import express from 'express';

// connection to database
import './db';
import './seedData';

// authentication
import passport from './authenticate';

// import all resource routers
import accountsRouter from './api/accounts/accountsRouter';
import airtimeRouter from './api/airtime/airtimeRouter';
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
.use(passport.initialize())

.use('/api/accounts', passport.authenticate('jwt', {session: false}), accountsRouter, prepareOutput)
.use('/api/airtime', passport.authenticate('jwt', {session: false}), airtimeRouter, prepareOutput)
.use('/api/contacts', passport.authenticate('jwt', {session: false}), contactsRouter, prepareOutput)
.use('/api/notifications', passport.authenticate('jwt', {session: false}), notificationsRouter, prepareOutput)
.use('/api/retailers', passport.authenticate('jwt', {session: false}), retailersRouter, prepareOutput)
.use('/api/users', usersRouter, prepareOutput)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors)

// Run the server
.listen(port, () => {
  console.info(`Server running at ${port}`);
});