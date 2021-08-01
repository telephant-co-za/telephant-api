import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

const moment = require('moment-timezone');

const createError = require('http-errors');

// Import models
import Account from '../../../models/accountModel';
import Transaction from '../../../models/transactionModel';
import Contact from '../../../models/contactModel';
import User from '../../../models/userModel';
import Notification from '../../../models/notificationModel';

// Funtions

async function lookupAccountID(username) {

    let document = await Account.findOne({'accountName': username}).select('_id').exec();

    if (!document)
    {
        return `${username} is not a Telephant user`;
    }
        else
    {
        return document._id;
    }
}

// Airtime does not have its own schema in the db but
// will interact with the relevant schemas posting transactions and
// doing relevant lookups

//router
router

// GET /    balance
.get('/', asyncHandler(async( req, res, next) => {

    // Lookup the account ID for username
    const AccountID = await lookupAccountID(res.locals.account_name);

         try {

            const accountDetails = await Account
                                        .find({ _id: AccountID })
                                        .select(' balance sign accountName description');

            if (accountDetails.length > 0) {

            // Get the balance and format it for RSA or it says Not Avaialble
            let balance = accountDetails[0].balance;
            


            if (isNaN(balance))
            {
                balance = 'Not Available';
            }
            else
            {
                // REMOVED formating will leave this for the GUI.  Dev may want to use value as a number.

                //balance = Intl.NumberFormat('en-ZA', 
                //                            { style: 'currency', 
                //                              currency: 'ZAR' }).format(balance);

                // reverse the sign
                // should be positiove but incase there is a deficit on the account
                // maybe suport credit lines in the future
                balance = balance * (-1 * accountDetails[0].sign);
            }

            // Make a time stamp in GMT+2
            let now = moment().tz('Africa/Johannesburg');

            // Put the repsonse object together
            const returnObject = {
                accountID: accountDetails[0]._id,
                accountName: accountDetails[0].accountName,
                description: accountDetails[0].description,
                balance: balance,
                timestamp_ZA: now.toString(),
                timestamp_UTC: now.toISOString() 
            };

            // Neaten up the response object, if no description then mute it
            if (accountDetails[0].description == "")
            {
                returnObject.description = undefined;
            }

            res.locals.output = returnObject;

            } else {
                const err = createError(404, 'Could not find this Account ID in your available accounts.');
                next(err);
            }
        }
        catch (error) {
            const err = createError(500, error);
            next(err);
        }
    
    next();
}))

// POST /   use airtime
.post('/', asyncHandler(async( req, res, next) => {

}))

// GET /:ContactID     request airtime from a contact
.get('/:ContactID', asyncHandler(async( req, res, next) => {

}))

// PUT     send airtime to a contact
                    // as in put airtime in someone hand
.put('/', asyncHandler(async( req, res, next) => {

    if (!req.body.contactPhoneNumber)
    {
        const err = createError(400, 'There was no phone number for a contact to send airtime to.');
        next(err);        
    }

    // gather request details
    const contactphonenumber = req.body.contactPhoneNumber;
    const user = res.locals.account_name;
    const amount_to_send = req.body.amount

    try {
    // Check that phone number is in the contacts

        const ReceiverContact = await Contact
        .find({ telephoneNumber: contactphonenumber, owner: user });

        // if no results return a message
        if (ReceiverContact.length == 0)
        {
            const err = createError(400, 'The phone number provided for the receiver does not appear in the account\'s contact list.');
            return next(err); 
        }
    }
    catch (error) {
        const err = createError(500, error);
        return next(err);
    }

    try {
        // Check that the receiver is a user of the telephant system
    
            const ReceiverUser = await User
            .find({ telephoneNumber: contactphonenumber });
    
            // if no results return a message
            if (ReceiverUser.length == 0)
            {
                const err = createError(400, 'The phone number provided for the receiver is not a registered user of the Telephant system.');
                return next(err); 
            }
        }
        catch (error) {
            const err = createError(500, error);
            return next(err);
        } 
        
    try {
        // Check that balance is sufficient
    
            const SenderAccount = await Account
            .find({ accountName: user });
    
            // if balance less then amount to send is a problem
            if ( SenderAccount[0].balance < amount_to_send)
            {
                const err = createError(400, 'There is insufficient balance to complete this send request.');
                return next(err); 
            }
        }
        catch (error) {
            const err = createError(500, error);
            return next(err);
        } 

    // Pre-checks complete...

    // Make an object for using during transaction

    const RequestDetails = {
        dateTime: "2021-08-17T13:45"

    };
    
    // Execute transaction

    // Update balances

    // Notify 

        // Send notification to sender and receiver
        // read, type set by default

 /*        SenderNotification = {
            "dateTime" : ,
            "subject": "Sent",
            "message": "You sent Cobello R 10",
            "owner": username,
            "link": "TO DO"
          }

          ReceiverNotification = {
            "dateTime" : ,
            "subject": "Recevied",
            "message": "You sent Cobello R 10",
            "owner": username,
            "link": "TO DO"
          } */

}));

export default router;