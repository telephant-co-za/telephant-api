import express from 'express';

// connection to database and seed the db
import '../../db/connection';
import '../../db/seedData';

// import common middleware
const wrongPath = require('../../functions/wrongPath');
const prepareErrors = require('../../functions/prepareErrors');
const prepareOutput = require('../../functions/prepareOutput');
const accountHeader = require('../../functions/accountHeader');
import passport from '../../functions/authenticate';
const protectRoute = passport.authenticate('jwt', {session: false});

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

.use('/accounts', protectRoute, accountHeader, accountsRouter, prepareOutput)
.use('/airtime', protectRoute, accountHeader,airtimeRouter, prepareOutput)
.use('/contacts', protectRoute, accountHeader,contactsRouter, prepareOutput)
.use('/notifications', protectRoute, accountHeader,notificationsRouter, prepareOutput)
.use('/retailers', protectRoute, accountHeader,retailersRouter, prepareOutput)
.use('/transactions', protectRoute, accountHeader,transactionsRouter, prepareOutput)
.use('/users', usersRouter, prepareOutput)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;
