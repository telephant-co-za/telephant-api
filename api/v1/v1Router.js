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

.use('/accounts', protectRoute, accountHeader, accountsRouter)
.use('/airtime', protectRoute, accountHeader,airtimeRouter)
.use('/contacts', protectRoute, accountHeader,contactsRouter)
.use('/notifications', protectRoute, accountHeader,notificationsRouter)
.use('/retailers', protectRoute, accountHeader,retailersRouter)
.use('/transactions', protectRoute, accountHeader,transactionsRouter)
.use('/users', usersRouter)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Prepare the output into the correct format
.use(prepareOutput)

// Error Handler
.use(prepareErrors);

export default router;
