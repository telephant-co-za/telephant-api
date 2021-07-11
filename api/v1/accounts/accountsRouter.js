// imports

import express from 'express';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();

// Import models
import Account from '../../../models/account';

// custom functions
const wrongPath = require('../../../functions/wrongPath');
const prepareErrors = require('../../../functions/prepareErrors');




// ROUTER

// GET return list of accounts
router
    .get('/', asyncHandler(async(req, res, next) => {

        let { page = 1, limit = 10 } = req.query;
        [page, limit] = [+page, +limit];

        try {
            const accountsPromise = Account
                                    .find({ $or:[ 
                                        { owners: req.user.telephoneNumber, type: 'GRP' },        // Find business accounts that the user has access to
                                        { accountName: req.user.telephoneNumber, type: 'USR' }    // By default all users will have rights over there own account
                                    ]})
                                    .limit(limit)
                                    .skip((page - 1) * limit)
                                    .select(' _id accountName ');

            const accounts = await accountsPromise;
            const totalDocuments = await Account
                                                .find({ $or:[ 
                                                    { owners: req.user.telephoneNumber, type: 'GRP' }, 
                                                    { accountName: req.user.telephoneNumber, type: 'USR' } 
                                                ]}).countDocuments();
                    
            const returnObject = {
                                    page: page,
                                    total_pages: Math.ceil(totalDocuments / limit),
                                    total_results: totalDocuments,
                                    results: accounts
                                };
                    
                                res.locals = returnObject;
                                next();
    }
        catch (error) {
        createError(500, error);
    }
}))

// GET return details from a specific account
.get('/:account_id', asyncHandler(async(req, res, next) => {

    try 
        {
            const account = await Account
            .find( { _id: req.params.account_id, owners: req.user.telephoneNumber }, {
                "_id": 1,
                "accountName": 1,
                "owners": 1
              });
                    
            res.locals = account;
            next();
        }
    catch (error) 
        {
            createError(500, error);
        }    
    })
)

// POST add a new account
.post('/', (req, res) => {
    res.json({"will" : "add a new account"})
})

// DELETE delete a specified accounts
.delete('/', asyncHandler(async(req, res, next) => {

        const account_id = req.headers.account_id;

        // changing own account - cannot delete your own account

        let account = await Account.find({_id: account_id}).select('accountName -_id');
        let accountName = account.map((account)=>{return account.accountName});
        // TO DO: errors

        if (req.body.owner == accountName[0])
        {  
            const err = createError(403, 'It is not possible to delete your own account.  Please provide a group account in the header.  See the documentation for detail.');
            next(err);
        }

        try {

                await Account.findByIdAndDelete(account_id);
                next();

            }
            catch (error) 
            {
                const err = createError(500, error);
                next(err);
            }
        }  
    )
)

// PUT update a specified account
.put('/:AccountID', (req, res) => {
    res.json({"will" : "update a specified account"});
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath)

// Error Handler
.use(prepareErrors);

export default router;