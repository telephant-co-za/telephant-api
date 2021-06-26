import express from 'express';

// connection to database and seed the db
import '../../db/connection';
import '../../db/seedData';

// import common middleware
const wrongPath = require('../../functions/wrongPath');
const prepareErrors = require('../../functions/prepareErrors');
const prepareOutput = require('../../functions/prepareOutput');

// import all resource routers
import accountsRouter from './accounts/accountsRouter';
import airtimeRouter from './airtime/airtimeRouter';
import contactsRouter from './contacts/contactsRouter';
import notificationsRouter from './notifications/notificationsRouter';
import retailersRouter from './retailers/retailersRouter';
import transactionsRouter from './transactions/transactionsRouter';
import usersRouter from './users/usersRouter';

const router = express();

router
.use(express.json())
.use(express.urlencoded())

.use('/accounts', accountsRouter, prepareOutput)
.use('/airtime', airtimeRouter, prepareOutput)
.use('/contacts', contactsRouter, prepareOutput)
.use('/notifications', notificationsRouter, prepareOutput)
.use('/retailers', retailersRouter, prepareOutput)
.use('/transactions', transactionsRouter, prepareOutput)
.use('/users', usersRouter, prepareOutput)

//passport.authenticate('jwt', {session: false}), 

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;
