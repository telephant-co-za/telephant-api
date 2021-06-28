import dotenv from 'dotenv';
import express from 'express';
import https from 'https';

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
//const port = process.env.PORT;
const app = express();

app
.use(express.json())

// top routes
.use('/docs', docsRouter)
.use('/v1/ping', pingRouter)
//.use('/superadmin', passport.authenticate('jwt', {session: false}), superadminRouter, prepareOutput)
.use('/v1', apiRouter, prepareOutput)

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors)

// SSL
const fs = require('fs');
const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');
const sslPort = process.env.SSL_PORT;
const server = https.createServer({key: key, cert: cert }, app);

// Run the server
server.listen(sslPort,() => {
  console.info(`HTTPS Server running at ${sslPort}`);
});