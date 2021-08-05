const express = require('express');
const router = express();
var logger = require('../../functions/logger');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Pong.'
    });
    logger.info('Someone pinged us.  How exciting!')
});

export default router;