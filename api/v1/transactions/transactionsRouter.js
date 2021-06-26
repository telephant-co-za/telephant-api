import express from 'express';

const router = express.Router();

// import common middleware
const wrongPath = require('../../../functions/wrongPath');
const prepareErrors = require('../../../functions/prepareErrors');


router
// GET return list of transactions
.get('/', (req, res) => {
    res.json({"will" : "return list of transactions"});
})

// GET return details of a specific transaction
.get('/:TransactionID', (req, res) => {
    res.json({"will" : "return a specific transaction"});
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;