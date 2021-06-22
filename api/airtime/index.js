import express from 'express';

const router = express.Router();

function checkAccountBalance(username) {
    return 100.12;
}

// Airtime does not have its own schema in the db but
// will interact with the relevant schemas posting transactions and
// doing relevant lookups

// GET /    balance
router.get('/', (req, res, next) => {

    const AccountBalance = checkAccountBalance(req.user.username);

    const returnObject = {
        balance: AccountBalance
    };

    res.locals = returnObject;
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
router.post('/:ContactID', (req, res) => {
    res.json({ "will": "send airime to a contact" });
});

export default router;