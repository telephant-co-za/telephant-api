import express from 'express';

const router = express.Router();

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
});

export default router;