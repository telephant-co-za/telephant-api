import express from 'express';
const router = express.Router();
const mongoose = require('mongoose');
import asyncHandler from 'express-async-handler';

const moment = require('moment-timezone');
var crypto = require("crypto");

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

    if (!req.body.accountName)
    {
        const err = createError(400, 'There was no phone number for a contact to send airtime to.');
        next(err);        
    }

    // gather request details
    const account_name= req.body.accountName;
    const user = res.locals.account_name;
    const amount_to_send = req.body.amount;

    // Reject if amount_to_send NaN
    if(isNaN(amount_to_send))
    {
        const err = createError(400, 'You have specified an amount to send that is not a valid positive number.');
        return next(err); 
    }

    // Reject if amount_to_send -Negative
    if(amount_to_send<0)
    {
        const err = createError(400, 'You have specified an amount to send that is not a valid positive number.');
        return next(err); 
    }

    try {
        // Check that the receiver is an account of the telephant system
    
            const ReceiverAccount = await Account
            .find({ accountName: account_name });
    
            // if no results return a message
            if (ReceiverAccount.length == 0)
            {
                const err = createError(400, 'The account provided for the receiver is not a registered user of the Telephant system.');
                return next(err); 
            }

            var receiver = ReceiverAccount[0];
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

            var sender = SenderAccount[0];
        }
        catch (error) {
            const err = createError(500, error);
            return next(err);
        } 

    // Pre-checks complete...

    // Make objects for using during transaction

    let timestamp = moment().tz('Africa/Johannesburg').toISOString();
    let amount_zar = Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount_to_send);
    let trans_id = crypto.randomBytes(10).toString('hex'); // make a random stirng to group the transactions
    let fee =  1.00;  //fee is fixed to R 1.00 for sending
    let tax = fee * 0.15; // VAT is 15%

    // some static accounts are preset like COA accounts
    // these are the same for any sending transaction

    const transactionsObject = [
        {
            "transactionID": trans_id,
            "accountID": sender._id,
            "dateTime": timestamp,
            "type": "SEND",
            "amount": amount_to_send,
            "sign": 1,
            "description": `You sent ${account_name} ${amount_zar}`.substring(0, 200)
          },
          {
            "transactionID": trans_id,
            "accountID": "60ebd53e2f79311541618bc5",
            "dateTime": timestamp,
            "type": "FEE",
            "amount": fee,
            "sign": 1,
            "description": "Sending fee"
          },
          {
            "transactionID": trans_id,
            "accountID": "60ebd53e2f79311541618bc5",
            "dateTime": timestamp,
            "type": "TAX",
            "amount": tax,
            "sign": 1,
            "description": "VAT"
          },

          // Other half....

          {
            "transactionID": trans_id,
            "accountID": receiver._id,
            "dateTime": timestamp,
            "type": "RECEIVE",
            "amount": amount_to_send,
            "sign": -1,
            "description": `You received ${amount_zar} from ${user}`.substring(0, 200)
          },
          {
            "transactionID": trans_id,
            "accountID": "60ebd53e2f79311541618bc4",
            "dateTime": timestamp,
            "type": "FEE_REVENUE",
            "amount": fee,
            "sign": -1,
            "description": "Sending fee"
          },
          {
            "transactionID": trans_id,
            "accountID": "60ebd53e2f79311541618b12",
            "dateTime": timestamp,
            "type": "TAX_ACCOUNT",
            "amount": tax,
            "sign": -1,
            "description": "VAT"
          }
    ];

    const balanceObject = [
                            {
                                "_id": sender._id,
                                "balance": sender.balance - amount_to_send
                            },
                            {
                                "_id": receiver._id,
                                "balance": receiver.balance + amount_to_send
                            }
                        ];

    const notificationsObject = [

        // If field not set explicitly here then the defaults are take from the model
                            {
                                "dateTime" : timestamp,
                                "subject": "Sent Airtime",
                                "message": `You sent ${account_name} ${amount_zar}`.substring(0, 200),
                                "owner": user
                            },
                            {
                                "dateTime" : timestamp,
                                "subject": "Recevied Airtime",
                                "message": `You received ${amount_zar} from ${user}`.substring(0, 200),
                                "owner": account_name
                            }
                        ];
    
    // Execute transactions all in one go
    // All or nothing!!

    try {
        const session = await mongoose.startSession(); 
        await session.withTransaction(async () => { 

            // transactions
            await Transaction.create(transactionsObject, { session });

            // balances
            // loop through updates to the balances

            for (const item in balanceObject) {
                await Account.findByIdAndUpdate(balanceObject[item]._id,{"balance": balanceObject[item].balance})
              }

            // notifications
            await Notification.create(notificationsObject, { session });
    
        });

        session.endSession();
        res.status(200).json({ message: 'The airtime was sent successully' });

    } 
    catch (error) 
    {
        const err = createError(500, error);
        next(err);
    }

}));

export default router;