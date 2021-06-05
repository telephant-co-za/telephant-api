import express from 'express';

const router = express.Router();

// GET return list of contacts
router.get('/', (req, res) => {
    res.json({"will" : "return list of contacts"});
});

// POST add a new contact
router.post('/', (req, res) => {
    res.json({"will" : "add a new contact"});
});

// DELETE delete a specified contact
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified contact"});
});

// PUT update a specified contact
router.put('/', (req, res) => {
    res.json({"will" : "update a specified contact"});
});

export default router;