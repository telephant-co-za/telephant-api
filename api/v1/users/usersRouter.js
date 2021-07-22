// imports

import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();

// models

import User from '../../../models/userModel';
//import prepareErrors from '../../../functions/prepareErrors';




// LOGIC

// Sign up
router.post('/', asyncHandler(async (req, res, next) => {
    if (req.query.action === 'signup') {
        try {
            await User.create({
                telephoneNumber: req.body.telephoneNumber,
                password: req.body.password
            });
            res.status(201).json({
                message: "The user was successfully registered.",        
            });
        } catch (error) 
        {
            if(typeof error.errors !== 'undefined' && error.errors.password)
            {
                const errStr = error._message + ' : ' + error.errors.password.properties.message;
                const err = createError(400, errStr);
                next(err);
            }
            else if (typeof error.errors !== 'undefined' && error.errors.telephoneNumber)
            {
                const errStr = error._message + ' : ' + error.errors.telephoneNumber.properties.message;
                const err = createError(400, errStr);
                next(err);
            }
            else if(typeof error !== 'undefined' && error.code === 11000)
            {
                const errStr = 'This telephone number is already registered.';
                const err = createError(400, errStr);
                next(err);
            }
            else
            {
                const err = createError(500, error);
                next(err);
            }
        }

// Login        
     } else {
        
        // Does user exist?
        const user = await User.findByUserName(req.body.telephoneNumber);
        if (!user) {
            const err = createError(401, 'Unable to authenticate using credentials provided.');
            next(err);
        }

        // Compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {

                // if user is found and password is right create a token
                const token = jwt.sign(req.body.telephoneNumber, process.env.secret);

                // return the information including token as JSON
                res.status(200).json({
                    message: 'User successfully logged in.',
                    token: 'BEARER ' + token,
                });

            // if password does not match send error
            } else {
                const err = createError(401, 'Unable to authenticate using credentials provided.');
                next(err);
            }
        });

    }
}));

// Update a user
// router.put('/:id', async (req, res) => {
//     if (req.body._id) delete req.body._id;
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
//     if (user)
//         res.json(200, user);
//     else
//         res.json(404, NotFound);
// });

export default router;