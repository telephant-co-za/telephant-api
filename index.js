import dotenv from 'dotenv';
import express from 'express';

// import main routers
import apiRouter from './api/v1/v1Router';
import docsRouter from './api/docs/docs'
import pingRouter from './api/ping/pingRouter';
//import superadminRouter from './superadmin/superadminRouter';

// import common middleware
const wrongPath = require('./functions/wrongPath');
const prepareErrors = require('./functions/prepareErrors');
const prepareOutput = require('./functions/prepareOutput');
import passport from './functions/authenticate';

// import env variables
dotenv.config();
const port = process.env.PORT;
const app = express();

app
.use(express.json())

// top routes
.use('/docs', docsRouter)
.use('/ping', pingRouter)
//.use('/superadmin', passport.authenticate('jwt', {session: false}), superadminRouter, prepareOutput)
.use('/v1', apiRouter, prepareOutput)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors)

// Run the server
.listen(port, () => {
  console.info(`Server running at ${port}`);
});