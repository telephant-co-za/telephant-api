import express from 'express';

const router = express.Router();

// import common middleware
const wrongPath = require('../../../functions/wrongPath');
const prepareErrors = require('../../../functions/prepareErrors');

// GET return list of notifications
router.get('/', (req, res) => {
    res.json({"will" : "return list of notifications"});
});

// GET return list of notifications
router.get('/:NotificationID', (req, res) => {
    res.json({"will" : "return a specific notification"});
});

// POST Mark all unread notifications as read
router.post('/', (req, res) => {
    res.json({"will" : "mark all unread notifications as read"});
});

// POST Mark a specific notification as read
router.post('/:NotificationID', (req, res) => {
    res.json({"will" : "mark a specific notification as read"});
});

// PUT Accept / Reject a specific credit request
router.put('/:NotificationID', (req, res) => {
    res.json({"will" : "Accept / Reject a specific credit request"})
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;