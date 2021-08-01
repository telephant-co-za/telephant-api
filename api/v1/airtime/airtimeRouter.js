import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

const moment = require('moment-timezone');

const createError = require('http-errors');


// Import models
import Account from '../../../models/accountModel';
import Transactions from '../../../models/transactionModel';

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
.post('/', (req, res, next) => {

})

// GET /:ContactID     request airtime from a contact
.get('/:ContactID', (req, res, next) => {

})

// POST /:ContactID     send airtime to a contact
.post('/:PhoneNumber', async (req, res, next) => {

});

export default router;

















 /*    async function sendAirtime(credit, debit, balance) {


    
    // Need checkAccontBalance as used as control
    async function checkAccountBalance(accountID) {
    
        const ownBalance = await Account.findOne({'_id': accountID}).select('sign balance').exec();
    
        if (ownBalance) {
            // Reverse the sign of the account
            let AccountBalance = (-1 * ownBalance.sign) * ownBalance.balance;
            return AccountBalance;
        } else {
            return "Not Found";
        }
    } 
    
    
    
   
*/