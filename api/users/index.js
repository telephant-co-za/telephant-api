import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from './userModel';
const createError = require('http-errors');

const router = express.Router();

// Sign up
router.post('/', asyncHandler(async (req, res, next) => {
    if (req.query.action === 'signup') {
        await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(201).json({ success: true });

// Login        
     } else {
        
        // Does user exist?
        const user = await User.findByUserName(req.body.username);
        if (!user) {
            const err = createError(401, 'Sorry. No record of user ('+req.body.username+') found.');
            next(err);
        }

        // Compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {

                // if user is found and password is right create a token
                const token = jwt.sign(user.username, process.env.secret);

                // return the information including token as JSON
                res.status(200).json({
                    status_message: "Success",
                    status_code: 200,
                    token: 'BEARER ' + token,
                });

            // if password does not match send error
            } else {
                const err = createError(401, 'Sorry. Unable to authenticate using credentials provided.');
                next(err);
            }
        });

    }
}));

// // Update a user
// router.put('/:id', async (req, res) => {
//     if (req.body._id) delete req.body._id;
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
//     if (user)
//         res.json(200, user);
//     else
//         res.json(404, NotFound);
// });

export default router;