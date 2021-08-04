import dotenv from 'dotenv';
import express from 'express';

// security
import https from 'https';
var hpp = require('hpp');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
var cors = require('cors');

// import main routers
import apiRouter from './api/v1/v1Router';
import docsRouter from './api/docs/docs'
import pingRouter from './api/ping/pingRouter';

// import common middleware
const wrongPath = require('./functions/wrongPath');
const prepareErrors = require('./functions/prepareErrors');
const prepareOutput = require('./functions/prepareOutput');

// import env variables
dotenv.config();
//const port = process.env.PORT;
const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app
.use(cors())
.use(express.json())
.use(express.urlencoded({ extended: true }))

// Security middleware
.use(hpp())
.use(helmet())
.use(limiter)

// top routes
.use('/docs', docsRouter)
.use('/ping', pingRouter)
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