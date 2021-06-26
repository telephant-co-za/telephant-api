import express from 'express';

const router = express.Router();

// import common middleware
const wrongPath = require('../../../functions/wrongPath');
const prepareErrors = require('../../../functions/prepareErrors');

// GET return list of retailers
router.get('/', (req, res) => {
    res.json({"will" : "return list of retailer"});
});

// POST add a new retailer
router.post('/', (req, res) => {
    res.json({"will" : "add a new retailer"});
});

// DELETE delete a specified retailer
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified retailer"});
});

// PUT update a specified retailer
router.put('/', (req, res) => {
    res.json({"will" : "update a specified retailer"});
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;