import express from 'express';
const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Import models
import Account from '../accounts/accountModel';
import GroupsRights from '../groupsrights/groupsrightsModel';
import Transactions from '../transactions/transactionsModel';

const router = express.Router();

// Funtions
// Functions are shared by various routes

async function sendAirtime(credit, debit, balance) {

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


async function checkAccountBalance(accountID) {

    const query = {'accountID': accountID};
    const ownBalance = await Account.findOne(query).select('sign balance').exec();
    let AccountBalance;

    if (ownBalance) {
        ownBalance.sign ? AccountBalance = ownBalance.balance : AccountBalance = -1 * ownBalance.balance;
        return AccountBalance;
    } else {
        return "Not Found";
    }
}

async function checkAccountsViewable(accountID, username, rights) {

    let accountRights = 
        GroupsRights.
            find({},{_id:0}).
            where('rights').
            gte(rights).
            where('username').
            equals(username).
            select('accountID').
            exec();

    return accountRights;
}

async function lookupAccountID(username) {
    
    const query = {'name': username};
    let document = await Account.findOne(query).select('_id').exec();

    if (!document)
    {
        return `${username} is not a Telephant user`;
    }
        else
    {
        console.log(document._id);
        return document.accountID;
    }

}

async function lookupAccountName(accountID) {
    
    const query = {'_id': accountID};
    let document = await Account.findOne(query).select('name').exec();

    return document;
}

// Airtime does not have its own schema in the db but
// will interact with the relevant schemas posting transactions and
// doing relevant lookups

// GET /    balance
router.get('/', async (req, res, next) => {

    // Lookup the account ID for username
    const AccountID = await lookupAccountID(req.user.username);

    // Check which other accounts the username can view (2)
    let AccountsViewable = await checkAccountsViewable(AccountID, req.user.username, 2);

    // A user will have level 5 control over their own account that will not be reflected in the
    // groupsrights, so will add that account to AccountsViewable at the top of the array 
    // of accounts
    AccountsViewable.unshift({'accountID': AccountID});

    // 
    let balanceObject = [];
    for (var accountID in AccountsViewable) {

        // Check which accounts the user can view
        const AccountID = AccountsViewable[accountID].accountID;

        // Get the balance and format it for RSA
        let AccountBalance = await checkAccountBalance(AccountID);
        isNaN(AccountBalance) ? AccountBalance = 'Not Available' : AccountBalance = Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(AccountBalance)
        
        // Make a time stamp in GMT+2
        var now = moment().tz('Africa/Johannesburg').format('dddd, MMMM Do YYYY, h:mm:ss a z');

        // Get the accounts name
        let AccountName = await lookupAccountName(AccountID);
        !AccountName ? AccountName = AccountName = 'Not Defined' : AccountName = AccountName._doc.name;

        balanceObject.push({
            'accountID': AccountID,
            'accountName': AccountName,
            'balance': AccountBalance,
            'dateTime': now
        });
    }

    res.locals = balanceObject;
    next();
});

// POST /   use airtime
router.post('/', (req, res) => {
    res.json({ "will": "convert credit to airtime" });
});

// GET /:ContactID     request airtime from a contact
router.get('/:ContactID', (req, res) => {
    res.json({ "will": "request airtime from a contact" });
});

// POST /:ContactID     send airtime to a contact
router.post('/:PhoneNumber', async (req, res, next) => {

    // Send to telephone number
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
    
    res.json(req.body.amount);

});

export default router;