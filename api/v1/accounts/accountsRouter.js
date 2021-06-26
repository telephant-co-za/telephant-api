import express from 'express';

// Import models
import Accounts from '../accounts/accountModel';

// import common middleware
const wrongPath = require('../../../functions/wrongPath');
const prepareErrors = require('../../../functions/prepareErrors');

const router = express.Router();

// GET return list of accounts
router.get('/', (req, res) => {
    res.json({"will" : "return list of accounts"});
});

// GET return details from a specific account
router.get('/:AccountID', (req, res) => {
    res.json({"will" : "return details of a specific account"});
});

// POST add a new account
router.post('/', (req, res) => {
    res.json({"will" : "add a new account"});
});

// DELETE delete a specified accounts
router.delete('/:AccountID', (req, res) => {
    res.json({"will" : "delete a specified account"});
});

// PUT update a specified account
router.put('/:AccountID', (req, res) => {
    res.json({"will" : "update a specified account"});
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;