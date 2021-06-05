import express from 'express';

const router = express.Router();

// GET return list of users
router.get('/', (req, res) => {
    res.json({"will" : "return list of users"});
});

// POST add a new user
router.post('/', (req, res) => {
    res.json({"will" : "add a new user"});
});

// DELETE delete a specified user
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified user"});
});

// PUT update a specified user
router.put('/', (req, res) => {
    res.json({"will" : "update a specified user"});
});

export default router;