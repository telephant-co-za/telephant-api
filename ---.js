import dotenv from 'dotenv';
import express from 'express';

// connection to database
import '../db';

// seed the db
import '../seedData';

// authentication
import passport from '../functions/authenticate';

// import all resource routers
import accountsRouter from './api/accounts/accountsRouter';
import airtimeRouter from './v1/airtime/airtimeRouter';
import contactsRouter from './v1/users/contacts/contactsRouter';
import notificationsRouter from './v1/users/notifications';
import pingRouter from './ping/pingRouter';
import retailersRouter from './v1/users/retailers';
import superRouter from './superadmin/superRouter';
import usersRouter from './v1/users';

// serve the swagger file
// will change this later to be on seperate subdomain
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
const swaggerDocument = yaml.load(fs.readFileSync('./swagger-docs/swagger.yml', 'utf8'));

import wrongPath from './functions/wrongPath';
const prepareErrors = require('../functions/prepareErrors');
const prepareOutput = require('../functions/prepareOutput');

dotenv.config();
const port = process.env.PORT;
const app = express();

app
.use(express.json())
.use(express.urlencoded())
.use(passport.initialize())

.use('/v1/accounts', passport.authenticate('jwt', {session: false}), accountsRouter, prepareOutput)
.use('/v1/airtime', passport.authenticate('jwt', {session: false}), airtimeRouter, prepareOutput)
.use('/v1/contacts', passport.authenticate('jwt', {session: false}), contactsRouter, prepareOutput)
.use('/v1/notifications', passport.authenticate('jwt', {session: false}), notificationsRouter, prepareOutput)
.use('/v1/retailers', passport.authenticate('jwt', {session: false}), retailersRouter, prepareOutput)
.use('/v1/super', superRouter, prepareOutput)
.use('/v1/users', usersRouter, prepareOutput)

// public routes
.use('/v1/ping', pingRouter)

// / docs -> swagger docs
.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors)

// Run the server
.listen(port, () => {
  console.info(`Server running at ${port}`);
});