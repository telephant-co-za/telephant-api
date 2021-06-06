import express from 'express';
import { NotExtended } from 'http-errors';

const router = express.Router();

// GET return list of contacts
router.get('/', (req, res, next) => {
    const payload = {
        'code': '200',
        'message': 'cccc'
    };
    res.locals = payload;
    next();
});

// POST add a new contact
router.post('/', (req, res) => {
    res.json({"Items" : "add a new contact"});
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