import express from 'express';
import asyncHandler from 'express-async-handler';
import { NotExtended } from 'http-errors';

// Import models
import contactModel from './contactModel';

const router = express.Router();
const createError = require('http-errors');

// GET return list of contacts
router
    .get('/', asyncHandler(async (req, res) => {

        let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
        [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)
        try {
            const totalDocumentsPromise = contactModel.estimatedDocumentCount(); //Kick off async calls
            const contactsPromise = contactModel.find().limit(limit).skip((page - 1) * limit);

            const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
            const contacts = await contactsPromise;

            const returnObject = {
                page: page,
                total_pages: Math.ceil(totalDocuments / limit),
                total_results: totalDocuments,
                results: contacts
            };//construct return Object and insert into response object

            res.status(200).json(returnObject);
        }
        catch (error) {
            createError(500, error);
        }
    }))

    // GET return details of a contact
    .get('/:phoneq', asyncHandler(async (req, res, next) => {
        try {

            const phoneq = req.params.phoneq;
            const contact = await contactModel.find({ phone: phoneq });

            if (contact.length > 0) {
                res.status(200).json(contact);
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

    // POST add a new contact
    .get('/', asyncHandler(async (req, res) => {
        res.json({ "Items": "add a new contact" });
    }))

    // DELETE delete a specified contact
    .delete('/', (req, res) => {
            res.json({ "will": "delete a specified contact" });
    })

    // PUT update a specified contact
    .put('/', (req, res) => {
            res.json({ "will": "update a specified contact" });
    });

export default router;