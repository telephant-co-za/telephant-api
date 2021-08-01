import express from 'express';
const moment = require('moment-timezone');
const createError = require('http-errors');
const router = express.Router();

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
.get('/', async (req, res, next) => {

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
})

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










    /* // Send to telephone number
    // Can only be a telphant user

    // 1) Check for that telephone number as a username
    const PhoneNumber = req.params.PhoneNumber;
    const RecipientID = await lookupAccountID(PhoneNumber);
    
    // Make a time stamp in GMT+2
    var now = moment().tz('Africa/Johannesburg').format('dddd, MMMM Do YYYY, h:mm:ss a z');

    if (RecipientID.match(/is not a Telephant user/)) {
        console.log('Arrrgh');
    }
    else
    {
        // 2) Extract the request send ammount
        const SendAmount = req.body.amount;

        // Control A - Reject if NaN
        if(isNaN(SendAmount)){
            console.log('Arrrgh2');
        }

        // Control B - Reject if -Negative
        if(SendAmount<0){
            console.log('Arrrgh3')
        }

        // Control D - Check user has sufficient rights
        //if(SendAmount<0){
        //    AccountID = await lookupAccountID(req.user.username);
        //    console.log('Arrrgh5')
        //}
        
        // The true transaction
        // 3) Check account balance
        const SenderID = await lookupAccountID(req.user.username);
        const CurrentBalance = await checkAccountBalance(SenderID);
        
        // Control D - Reject if Balance insufficient
        if(SendAmount > CurrentBalance)
        {
            console.log('Arrrrgh4');
        }

        // 3) Perform transaction because Control A, B, C passed
 
        const account = "Account";
 
        const creditObject = [{
            'accountID': RecipientID,
            'amount': SendAmount,
            'type': 'RECEIVE',
            'counterParty': SenderID,
            'dateTime': now,
            'sign': true
        }];
 
        const debitObject = [{
            'accountID': SenderID,
            'amount': SendAmount,
            'type': 'SEND',
            'counterParty': RecipientID,
            'dateTime': now,
            'sign': false
        }];
 
        const balanceObject = [{ 'accountID': SenderID }, { balance: 99999.99 }];

        sendAirtime(creditObject, debitObject, balanceObject);

    }
    
    res.json(req.body.amount); */






 /*    async function sendAirtime(credit, debit, balance) {

        try {
                const session = await mongoose.startSession(); 
                await session.withTransaction(async () => { 
    
                    // debit
                    const d = await Transactions.create(debit, { session });
    
                    // credit
                    const c = await Transactions.create(credit, { session });
    
                    // balance
                    const b = await Account.findOneAndUpdate([{ 'accountID': '710c7dd8-73e4-45b1-9c61-3c76a8f7fefe' }, { balance: 99999.99 }], { session });
            
                });
    
                session.endSession();
    
                console.log('success');
            } 
            catch (error) 
            {
                console.log(error);
            }
    }
    
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
    
    
    
   
async function lookupAccountName(accountID) {
    
    const query = {'_id': accountID};
    let document = await Account.findOne(query).select('name').exec();

    return document;
} 
    
    
    
    
    
    
    
    */