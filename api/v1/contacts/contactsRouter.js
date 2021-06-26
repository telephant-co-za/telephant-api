import express from 'express';
import asyncHandler from 'express-async-handler';

// Import models
import Contact from './contactModel';

const router = express.Router();
const createError = require('http-errors');
import wrongPath from '../../../functions/wrongPath';

// GET return list of contacts
router
    .get('/', asyncHandler(async (req, res, next) => {

        let { page = 1, limit = 20 } = req.query;
        [page, limit] = [+page, +limit];
        try {
            const totalDocumentsPromise = Contact.estimatedDocumentCount();
            const contactsPromise = Contact
                                        .find()
                                        .limit(limit)
                                        .skip((page - 1) * limit)
                                        .select({ _id: 0 });   //drop off the ID - for internal use only
            
            const totalDocuments = await totalDocumentsPromise;
            const contacts = await contactsPromise;

            const returnObject = {
                page: page,
                total_pages: Math.ceil(totalDocuments / limit),
                total_results: totalDocuments,
                results: contacts
            };

            //res.status(200).json(returnObject);
            res.locals = returnObject;
            next()
        }
        catch (error) {
            createError(500, error);
        }
    }))

    // GET return details of a contact
    .get('/:phoneq', asyncHandler(async (req, res, next) => {
        try {

            const phoneq = req.params.phoneq;
            const returnObject = await Contact
                                        .find({ phone: phoneq })
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
        try{
            await new Contact(req.body).save();
            res.status(200).json({ success: true });
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
            const result = await Contact.deleteOne({ phone: phoneq });

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
                            err = createError(409, 'Contact already matches state requested.');
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
                            err = createError(406, 'The request was unacceptable.');
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