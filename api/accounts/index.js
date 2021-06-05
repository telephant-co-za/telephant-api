import express from 'express';

const router = express.Router();

// GET return list of accounts
router.get('/', (req, res) => {
    res.json({"will" : "return list of accounts"});
});

// POST add a new account
router.post('/', (req, res) => {
    res.json({"will" : "add a new account"});
});

// DELETE delete a specified accounts
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified account"});
});

// PUT update a specified account
router.put('/', (req, res) => {
    res.json({"will" : "update a specified account"});
});

export default router;