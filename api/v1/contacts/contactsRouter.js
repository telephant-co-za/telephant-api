// imports

import express from 'express';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();

// models
import Contact from '../../../models/contactModel';

// custom functions
import wrongPath from '../../../functions/wrongPath';

// ROUTER

// GET return list of contacts
router
    .get('/', asyncHandler(async (req, res, next) => {
        
            let { page = 1, limit = 10 } = req.query;
            [page, limit] = [+page, +limit];

            try {
                const contactsPromise = Contact
                    .find({ owner: res.locals.account_name })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .select(' _id firstName lastName telephoneNumber email owner ');

                const contacts = await contactsPromise;
                const totalDocuments = await Contact
                    .find({ owner: res.locals.account_name })
                    .countDocuments();

                // if no results return a message
                if (totalDocuments == 0)
                {
                    const err = createError(400, 'No contacts found.');
                    return next(err); 
                }

                const returnObject = {
                    page: page,
                    total_pages: Math.ceil(totalDocuments / limit),
                    total_results: totalDocuments,
                    results: contacts
                };

                res.locals.output = returnObject;
                next();
            }
            catch (error) {
                const err = createError(500, error);
                return next(err);
            }
        }
    ))

    // GET return details of a contact
    .get('/:contactPhoneNumber', asyncHandler(async (req, res, next) => {
        try {

            const contactPhoneNumber = req.params.contactPhoneNumber;
            const returnObject = await Contact
                                        .find({ phone: contactPhoneNumber, owner: res.locals.account_name })
                                        .select({ _id: 0 });   //drop off the ID - for internal use only;

            if (returnObject.length > 0) {
                res.locals = returnObject;
                next();
            } else {
                const err = createError(404, 'Could not find this phone number in your contacts.');
                next(err);
            }
        }
        catch (error) {
            const err = createError(500, error);
            next(err);
        }
    }))

    // POST create a new contact
    .post('/', asyncHandler(async (req, res, next) => {

        const requestBody = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "telephoneNumber": req.body.telephoneNumber,
            "email": req.body.email,
            "owner": [req.localacount_name]
        }

        try{
            new Contact(requestBody).save();
            res.status(200).json({ message: 'The contact was successfully created.' });
        }
        catch(error)
        {
            const err = createError(500, error);
            next(err);
        }
    }))

    // DELETE delete a specified contact
    .delete('/:phoneq', asyncHandler(async (req, res, next) => {
        try {

            const phoneq = req.params.phoneq;
            const result = await Contact.deleteOne({ phone: phoneq, owner: req.body.owner });

            if (result.deletedCount === 1) {
                res.status(200).json({message: 'Contact succesfully deleted'});
            } else {
                const err = createError(404, 'Could not find this phone number in your contacts.');
                next(err);
            }
        }
        catch (error) {
            const err = createError(500, error);
            next(err);
        }
    }))

    // PUT update a specified contact
    .put('/:phoneq', asyncHandler(async (req, res, next) => {
        try {

            const phoneq = req.params.phoneq;
            const result = await Contact.updateOne({ phone: phoneq }, {first_name:"ABCD"});

            var err = ''; 
            switch (result.n) {
                case 1:
                    switch(result.nModified){
                        case 0:
                            //{ n: 1, nModified: 0, ok: 1 }               
                            err = createError(400, 'Contact already matches state requested.');
                            next(err);
                            break;
                        case 1:
                            //{n: 1, nModified: 1, ok: 1 }
                            res.status(200).json({message: 'Contact updated succesfully.'});
                            next(res);
                            break;
                        default:
                            break;
                    }
                    break;
                case 0:
                    switch(result.ok){
                        case 0:
                            //{ n: 0, nModified: 0, ok: 0 }                
                            err = createError(400, 'The request was unacceptable.');
                            next(err);
                            break;
                        case 1:
                            //{ n: 0, nModified: 0, ok: 1 }                
                            err = createError(404, 'Could not find this phone number in contacts list.');
                            next(err);
                            break;
                        default:
                            break;
                }             
            }
        }
        catch (error) {
            const err = createError(500, error);
            next(err);
        }
    }))

    // UNFOUND METHODS
    .all('/*', wrongPath);

export default router;