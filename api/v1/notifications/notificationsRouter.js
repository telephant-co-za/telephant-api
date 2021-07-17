// imports

import express from 'express';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();

// models
import Notification from '../../../models/notification';

// custom functions
import wrongPath from '../../../functions/wrongPath';

// ROUTER

router
// GET return list of notifications
.get('/', asyncHandler(async (req, res, next) => {
        
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    try {
        const notificationsPromise = Notification
            .find({ owner: res.locals.account_name })
            .limit(limit)
            .skip((page - 1) * limit)
            //.select(' _id first_name last_name email owner ');

        const notifications = await notificationsPromise;
        const totalDocuments = await Notification
            .find({ owner: res.locals.account_name })
            .countDocuments();

        // if no results return a message
        if (totalDocuments == 0)
        {
            const err = createError(400, 'No notifications found.');
            return next(err); 
        }

        const returnObject = {
            page: page,
            total_pages: Math.ceil(totalDocuments / limit),
            total_results: totalDocuments,
            results: notifications
        };

        res.locals.output = returnObject;
        next();
    }
    catch (error) {
        const err = createError(500, error);
        return next(err);
    }
}))

// GET return list of notifications
.get('/:NotificationID', (req, res) => {
    res.json({"will" : "return a specific notification"});
})

// POST Mark all unread notifications as read
.post('/', (req, res) => {
    res.json({"will" : "mark all unread notifications as read"});
})

// POST Mark a specific notification as read
.post('/:NotificationID', (req, res) => {
    res.json({"will" : "mark a specific notification as read"});
})

// PUT Accept / Reject a specific credit request
.put('/:NotificationID', (req, res) => {
    res.json({"will" : "Accept / Reject a specific credit request"})
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath);

export default router;