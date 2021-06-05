import express from 'express';

const router = express.Router();

// GET return list of notifications
router.get('/', (req, res) => {
    res.json({"will" : "return list of notifications"});
});

// POST add a new notifications
router.post('/', (req, res) => {
    res.json({"will" : "add a new notification"});
});

// DELETE delete a specified notification
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified notification"});
});

// PUT update a specified notification
router.put('/', (req, res) => {
    res.json({"will" : "update a specified notification"});
});

export default router;