const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Pong.'
    });
    console.log('Someone pinged us.  How exciting!')
});

export default router;