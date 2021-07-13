// imports

import express from 'express';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();

// Import models
import Account from '../../../models/account';
import User from '../../../models/user';

// custom functions
const wrongPath = require('../../../functions/wrongPath');



// ROUTER

// GET return list of accounts
router
    .get('/', asyncHandler(async( req, res, next) => {

        if (res.locals.action === 'listing') {
            let { page = 1, limit = 10 } = req.query;
            [page, limit] = [+page, +limit];

            try {
                const accountsPromise = Account
                    .find({
                        $or: [
                            { owners: req.user.telephoneNumber, type: 'GRP' },        // Find business accounts that the user has access to
                            { accountName: req.user.telephoneNumber, type: 'USR' }    // By default all users will have rights over there own account
                        ]
                    })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .select(' _id accountName description ');

                const accounts = await accountsPromise;
                const totalDocuments = await Account
                    .find({
                        $or: [
                            { owners: req.user.telephoneNumber, type: 'GRP' },
                            { accountName: req.user.telephoneNumber, type: 'USR' }
                        ]
                    }).countDocuments();

                const returnObject = {
                    page: page,
                    total_pages: Math.ceil(totalDocuments / limit),
                    total_results: totalDocuments,
                    results: accounts
                };

                res.locals.output = returnObject;
                next();
            }
            catch (error) {
                const err = createError(500, error);
                next(err);
            }
        }
        else if (res.locals.action === 'item') {
            try {
                const accountPromise = Account
                    .find({ _id: req.headers.account_id, owners: req.user.telephoneNumber }, {
                        "_id": 1,
                        "accountName": 1,
                        "description": 1,
                        "owners": 1
                    });

                const account = await accountPromise;

                res.locals.output = account;
                next();
            }
            catch (error) {
                const err = createError(500, error);
                next(err);
            }
        }
    }))

    // POST add a new account
    .post('/', asyncHandler(async(req, res, next) => {

        try {
            await Account.create({
                // Predefined - unchangable
                    type: 'GRP',                               // through this API only GRP accounts will be possible (COA = chart of account and USR = user are generated internally)
                    balance: 0.00,                             // Will always be zero
                    sign: true,                                // Will always be positiove because cannot drop into arrears
                    owners : [req.user.telephoneNumber],       // first owner will be the creator account

                //  Attributes that can be set                
                    accountName: req.body.accountName,         // must validate against scheme, /^[a-z0-9-]{3,16}$/
                    description: req.body.description          // 3 - 16 charac, lowercase letter (a-z), number (0-9), or underscores
                });                                            // this will be used be used as a reference on bank statements - for auto allocation of funds
                res.status(201).json({
                    message: "The group account was successfully created.",        
                });
            } catch (error) 
            {
                if(typeof error.errors !== 'undefined' && error.errors.accountName)
                {
                    const errStr = error._message + ' : ' + error.errors.accountName.properties.message;
                    const err = createError(400, errStr);
                    next(err);
                }
                if(typeof error.errors !== 'undefined' && error.errors.description)
                {
                    const errStr = error._message + ' : ' + error.errors.description.properties.message;
                    const err = createError(400, errStr);
                    next(err);
                }
                else if(typeof error !== 'undefined' && error.code === 11000)
                {
                    const errStr = 'This group account name is already registered.  Please choose another.';
                    const err = createError(409, errStr);
                    next(err);
                }
                else
                {
                    const err = createError(500, error);
                    next(err);
                }
            }
        })
    )

    // DELETE delete a specified accounts
    .delete('/', asyncHandler(async (req, res, next) => {

        // changing own account - cannot delete your own account
        // Note: this scenario was identified in accountHeader and tagged with 'listing'
        if (res.locals.action === 'listing') {
            const err = createError(403, 'It is not possible to delete your own account.  Please provide a group account in the header.  See the documentation for detail.');
            next(err);
        }
        else
        {
            try {
                await Account.findByIdAndDelete(res.locals.account_id);
                res.status(200).json({
                    message: "The account was succesfully deleted.",        
                });
            }
            catch (error) {
                const err = createError(500, error);
                next(err);
            }
        }
    }))

    // PUT update a specified account
    .put('/', asyncHandler(async (req, res, next) => {

        // changing own account - cannot delete your own account
        // Note: this scenario was identified in accountHeader and tagged with 'listing'
        if (res.locals.action === 'listing') {
            const err = createError(403, 'It is not possible to change your own account.    Please provide a different group account in the header.  See the documentation for detail.');
            next(err);
        }
        // make sure that request does not include 'illegal' items and reject if set
        else if (req.body.type || req.body.balance || req.body.sign || req.body._id)
        {
            const err = createError(403, 'The request attempts to replace values on the account that are forbidden and illegal.  See the documentation for detail.');
            next(err);
        }
        // cannot change the name of a group
        else if (req.body.accountName) {
            const err = createError(403, 'It is not possible to change the name of account group.');
            next(err);            
        }

        // Updates sections
        
        if (req.body){

            // description
            if (req.body.description) {
            try {
                const account = await Account.findOneAndUpdate(
                    { _id: req.headers.account_id },
                    { description: req.body.description },
                    { new: true }
                );
                res.locals.output = account;
            }
            catch (error) 
            { 
                if(typeof error.errors !== 'undefined' && error.errors.description)
                {
                    const errStr = error._message + ' : ' + error.errors.accountName.properties.message;
                    const err = createError(400, errStr);
                    next(err);
                }
                else
                {
                    const err = createError(500, error);
                    next(err);
                    }
                }
            }

            // owner
            if (req.body.owner) 
            {
                if (req.body.owner === req.user.telephoneNumber)
                {
                    const err = createError(400, 'The user telephone number is already an owner on this account.');
                    next(err);                   
                }
                else
                {
                    // check that telephone number is valid and a user in the system
                    try {
                            const check = await User.findOne({"telephoneNumber": req.body.owner}).countDocuments();
                        
                            if (check != 1){
                                const err = createError(400, 'Not a valid user\'s telphone number.');
                                next(err);  
                            }
                        }
                        catch (error) 
                        {
                            const err = createError(500, error);
                            next(err);
                        }
                        
                    try {
                            const account = await Account.findOneAndUpdate(
                                { _id: req.headers.account_id },
                                { owner: req.body.telephoneNumber },
                                { new: true }
                            );
                            res.locals.output = account;
                        }
                        catch (error) 
                        {
                            const err = createError(500, error);
                            next(err);
                        }

                    res.status(201).json({
                    message: "The group account was successfully updated.",        
                    });
                }
            }
            else
            {
                const err = createError(400, 'No relevant fields to update were defined.');
                next(err);
            }
        }
    }))

    // Catches all the wrong routes and refers person to documentation site
    .all('/*', wrongPath);

export default router;