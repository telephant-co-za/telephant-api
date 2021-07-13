// Import models
import Account from '../models/account';
const ObjectId = require('mongoose').Types.ObjectId;
const createError = require('http-errors');

function isValidObjectId(id){
    console.log('*************')
    console.log(id)
    console.log('*************')

    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


async function accountHeader(req, res, next) {

    // Perform following checks

    // 1) For security make sure that the req.body.account_id not set, delete it if it is

    if (req.body.account_id)
    {
        delete req.body.account_id;
    }

    // 2) Check if the req.header.account_id is set in the header
    // then we need to make account id the account id of the user account

    if (!req.headers.account_id)
    {
        const accountIdPromise = Account.find({ accountName: req.user.telephoneNumber }, { _id: 1 });
        const account = await accountIdPromise;
        const accountId = account.map((account) => { return account._id; });

        res.locals.account_id = accountId[0];
        res.locals.action = 'listing';
    }

    // 3) If the account id is set in the header
    if (req.headers.account_id)
    {
        // Make sure the account_id is actually the same pattern as a Mongo id before passing into mongo
        if (!isValidObjectId(req.headers.account_id))
        {
            const err = createError(400, 'The account ID provided is not valid.');
            next(err);
        }

        // define promises
        const OwnershipCheckPromise = Account.find({ _id: req.headers.account_id, owners: req.user.telephoneNumber }).countDocuments();
        const ValidAccountCheckPromise = Account.findById(req.headers.account_id).countDocuments();

        // 3.1) confirm that it is a valid account id
        const ValidAccountCheck = await ValidAccountCheckPromise;

        if (!ValidAccountCheck)
        {
            const err = createError(404, 'Not a valid account id.');
            next(err);
        }

        // 3.2) confirm that the user has ownership on this account
        const OwnershipCheck = await OwnershipCheckPromise;

        if (!OwnershipCheck || OwnershipCheck <= 0 )
        {
            const err = createError(403, 'Not authorised on this group account.');
            next(err);
        }

        // Set vars for next section
        res.locals.account_id = req.headers.account_id;
        res.locals.action = 'item';
               
    }
    
    // if those tests are passed
    next();

}

module.exports = accountHeader;