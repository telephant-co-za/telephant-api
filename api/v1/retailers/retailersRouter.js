// imports

import express from 'express';
import asyncHandler from 'express-async-handler';
const accountHeader = require('../../../functions/accountHeader');
import passport from '../../../functions/authenticate';
const protectRoute = passport.authenticate('jwt', {session: false});
const ObjectId = require('mongoose').Types.ObjectId;
const createError = require('http-errors');
const router = express.Router();

// models
import Retailer from '../../../models/retailerModel';

// custom functions
import wrongPath from '../../../functions/wrongPath';

function isValidObjectId(id){

    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

// ROUTER

// GET return list of retailers
router.get('/', asyncHandler(async(req, res, next) => 

// This shows all the retailers - it does not use authentication to limit
// the listing

{
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    try {
        const retailersPromise = Retailer
                                .find({ })
                                .limit(limit)
                                .skip((page - 1) * limit)
                                .select(' _id name area ');

        const retailers = await retailersPromise;
        const totalDocuments = await Retailer
                                    .find({}).countDocuments();

        // if no results return a message - shouldn't happen for accounts!
        if (totalDocuments == 0)
        {
            const err = createError(400, 'No accounts found.');
            return next(err); 
        }

        const returnObject = {
                                page: page,
                                total_pages: Math.ceil(totalDocuments / limit),
                                total_results: totalDocuments,
                                results: retailers
                                };

        res.locals.output = returnObject;
        next();
    }
        catch (error) {
        const err = createError(500, error);
        return next(err);
    }
}))

// POST add a new retailer
.post('/', protectRoute, asyncHandler(async(req, res, next) => {
    res.json({"will" : "add a new retailer"});
}))

// DELETE delete a specified retailer
.delete('/:retailer_id', protectRoute, accountHeader, asyncHandler(async(req, res, next) => {

    // isValidObjectId
    if (!isValidObjectId(req.params.retailer_id))
    {
        const err = createError(400, 'The retailer ID provided is not valid.');
        return next(err);
    }

    // confirm that it is a valid retailer id and has rights
    try {
        const retailersPromise = Retailer.find({ _id: req.params.retailer_id, owner: req.params.retailer_id});
        const checkExists_Ownership = await retailersPromise;

        // if no results return a message - shouldn't happen for accounts!
        if (checkExists_Ownership == 0)
        {
            const err = createError(400, 'No rights to delete that retailer.');
            return next(err); 
        }
        else
        {
            await 
            Retailer.deleteOne({
                _id: req.params.retailer_id
               });
        }
        next();
    }
        catch (error) {
        const err = createError(500, error);
        return next(err);
    }


    // consirm that the user has ownership rights on the 

    res.json({"will" : "delete a specified retailer"});
}))

// PUT update a specified retailer
.put('/', (req, res) => {
    res.json({"will" : "update a specified retailer"});
})

// Catches all the wrong routes and refers person to documentation site
.all('/*', wrongPath);

export default router;