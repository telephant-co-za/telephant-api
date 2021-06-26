const express = require('express');
const router = express();

router.all('/', (req, res) => {
    res.status(200).json({
        message: 'Pong.'
    });
    console.log('Someone pinged us.  How exciting!')
});

export default router;