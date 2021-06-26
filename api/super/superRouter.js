import express from 'express';

const router = express.Router();

import Accounts from '../accounts/accountModel';

// Funtions
// Functions are shared by various routes

async function checkTrialBalance() {

    let posDoc = await Accounts.aggregate([
        { $match: { sign: {$eq: true} } },
        { $group: { _id: null, balance: { $sum: "$balance" } } }
    ]);

    let negDoc = await Accounts.aggregate([
        { $match: { sign: {$eq: false } } },
        { $group: { _id: null, balance: { $sum: "$balance" } } }
    ]);

    console.log(negDoc.balance);
}


// GET return a trial balance result
router.get('/trial-balance', (req, res) => {
    const FinalBalance = checkTrialBalance();
    return FinalBalance;
});

// GET return a trial balance full
router.get('/trial-balance/full', (req, res) => {
    res.json({"will" : "return all accounts balances"});
});

export default router;