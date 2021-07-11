// Import models
import Account from '../models/account';
const createError = require('http-errors');

module.exports = async function(req, res, next) {

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
        req.body.account_id = req.user._id;
    }

    // 3) If the account id is set in the header
    if (req.headers.account_id)
    {
        // 3.1) confirm that it is a valid account id
        const isValidAccount = await Account
        .checkValidAccount(req.headers.account_id)

        if (!isValidAccount){
            const err = createError(404, 'Not a valid account.');
            next(err);
        }

        // 3.2) confirm that the user has ownership on this account
        const isOwner = await Account
        .checkOwnership(req.headers.account_id, req.user.telephoneNumber);

        if (!isOwner){
            const err = createError(403, 'Not authorised on this group account');
            next(err);
        }
               
    }
    
    // if those tests are passed
    next();

};