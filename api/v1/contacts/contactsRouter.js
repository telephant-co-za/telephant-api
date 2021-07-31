// imports

import express from 'express';
import asyncHandler from 'express-async-handler';

const createError = require('http-errors');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

// models
import Contact from '../../../models/contactModel';

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
                                        .find({ telephoneNumber: contactPhoneNumber, owner: res.locals.account_name })

            if (returnObject.length > 0) {
                res.locals.output = returnObject;
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

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            const err = createError(400, 'Request body is missing.');
            next(err);
        }

        else if(!req.body.telephoneNumber){
            const err = createError(400, 'A telephone number is required.');
            next(err);
        }

        // Pre-checks complete... Post the request
        else {

                const requestBody = {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "telephoneNumber": req.body.telephoneNumber,
                    "email": req.body.email,
                    "owner": res.locals.account_name
                };
                try{
                    new Contact(requestBody).save();
                    res.status(200).json({ message: 'The contact was successfully created.' });
                }
                catch(error)
                {
                    const err = createError(500, error);
                    next(err);
                }
            }
    }))

    // DELETE delete a specified contact
    .delete('/:ContactID', asyncHandler(async (req, res, next) => {

            const ContactID = req.params.ContactID;

            // isValidObjectId
            if (!isValidObjectId(ContactID))
            {
                const err = createError(400, 'The Contact ID provided is not valid.');
                return next(err);
            }

            // Check contact exists    
                const CheckExists = await Contact.find({
                owner: res.locals.account_name, 
                _id: ContactID});

            if (!CheckExists || CheckExists ==0)
            {
                const err = createError(404, 'Could not find this Contact ID in your contacts');
                return next(err);        
            }

        // Pre-checks complete...

        try {
            const result = await Contact.deleteOne({ _id: ContactID, owner: res.locals.account_name });

            if (result.deletedCount === 1) {
                res.status(200).json({message: 'Contact succesfully deleted.'});
            } else {

                // Just in case 
                const err = createError(404, 'Could not find this Contact ID in your contacts');
                next(err);
            }
        }
        catch (error) {
            const err = createError(500, error);
            next(err);
        }
    }))

    // PUT update a specified contact
    .put('/:ContactID', asyncHandler(async (req, res, next) => {

        const ContactID = req.params.ContactID;

        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            const err = createError(400, 'Request body is missing.');
            next(err);
        }

        // isValidObjectId
        if (!isValidObjectId(ContactID))
        {
            const err = createError(400, 'The Contact ID provided is not valid.');
            return next(err);
        }

        // Check contact exists    
            const CheckExists = await Contact.find({
            owner: res.locals.account_name, 
            _id: ContactID});

        if (!CheckExists || CheckExists ==0)
        {
            const err = createError(404, 'Could not find this Contact ID in your contacts');
            return next(err);        
        }

        // Pre-checks complete...

        //Can change: 
        // telephoneNumber
        // firstName
        // lastName
        // email

        if (req.body){

            // telephoneNumber
            if (req.body.telephoneNumber) {

                try {
                    const contact = await Contact.findByIdAndUpdate(
                        { _id: ContactID },
                        { telephoneNumber: req.body.telephoneNumber },
                        { new: true }
                    );
                    res.locals.output = contact;
                }
                catch (error) 
                { 
                    if(typeof error.errors !== 'undefined' && error.errors.telephoneNumber)
                    {
                        const errStr = error._message + ' : ' + error.errors.telephoneNumber.properties.message;
                        const err = createError(400, errStr);
                        return next(err);
                    }
                    else
                    {
                        const err = createError(500, error);
                        return next(err);
                        }
                    }
                }

            // firstName
            if (req.body.firstName || req.body.firstName === null) {

                try {
                    const contact = await Contact.findByIdAndUpdate(
                        { _id: ContactID },
                        { firstName: req.body.firstName },
                        { new: true }
                    );
                    res.locals.output = contact;
                }
                catch (error) 
                { 
                    if(typeof error.errors !== 'undefined' && error.errors.firstName)
                    {
                        const errStr = error._message + ' : ' + error.errors.firstName.properties.message;
                        const err = createError(400, errStr);
                        return next(err);
                    }
                    else
                    {
                        const err = createError(500, error);
                        return next(err);
                        }
                    }
                }

            // lastName
            if (req.body.lastName || req.body.lastName === null) {

                try {
                    const contact = await Contact.findByIdAndUpdate(
                        { _id: ContactID },
                        { lastName: req.body.lastName },
                        { new: true }
                    );
                    res.locals.output = contact;
                }
                catch (error) 
                { 
                    if(typeof error.errors !== 'undefined' && error.errors.lastName)
                    {
                        const errStr = error._message + ' : ' + error.errors.lastName.properties.message;
                        const err = createError(400, errStr);
                        return next(err);
                    }
                    else
                    {
                        const err = createError(500, error);
                        return next(err);
                        }
                    }
                }

            // email
            if (req.body.email || req.body.email === null) {

                try {
                    const contact = await Contact.findByIdAndUpdate(
                        { _id: ContactID },
                        { email: req.body.email },
                        { new: true }
                    );
                    res.locals.output = contact;
                }
                catch (error) 
                { 
                    if(typeof error.errors !== 'undefined' && error.errors.email)
                    {
                        const errStr = error._message + ' : ' + error.errors.email.properties.message;
                        const err = createError(400, errStr);
                        return next(err);
                    }
                    else
                    {
                        const err = createError(500, error);
                        return next(err);
                        }
                    }
                }
            
            if (!res.locals.output)
                {
                    const err = createError(400, 'No relevant fields to update were defined.');
                    return next(err);
                }

            res.status(201).json({
                message: "The contact was successfully updated.",        
                });
        
        }}))

    // UNFOUND METHODS
    .all('/*', wrongPath);

export default router;