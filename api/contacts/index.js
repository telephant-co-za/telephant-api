import express from 'express';
import { NotExtended } from 'http-errors';
import asyncHandler from 'express-async-handler';

// Import models
import contactModel from './contactModel';

const router = express.Router();

// GET return list of contacts
router.get('/', async (req, res) => {

    let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = contactModel.estimatedDocumentCount(); //Kick off async calls
    const contactsPromise = contactModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const contacts = await contactsPromise;

    const returnObject = { page: page, 
                           total_pages: Math.ceil(totalDocuments / limit), 
                           total_results: totalDocuments, 
                           results: contacts };//construct return Object and insert into response object

    res.status(200).json(returnObject);
});

// POST add a new contact
router.post('/', (req, res) => {
    res.json({"Items" : "add a new contact"});
});

// DELETE delete a specified contact
router.delete('/', (req, res) => {
    res.json({"will" : "delete a specified contact"});
});

// PUT update a specified contact
router.put('/', (req, res) => {
    res.json({"will" : "update a specified contact"});
});

export default router;