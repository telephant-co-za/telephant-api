const logger = require("./logger");

module.exports = function(error, req, res, next) {

    // Log the error
    // Make less verbose (comment out outputting stack and req)

    var now = new Date();

    logger.error('*** ERROR LOGGED BY prepareErrors ***');
    logger.error('\nDate Time: ' + now.toUTCString());
    logger.error('\nError status:' + error.status);
    logger.error('\nMessage: ' + error.message);
    logger.error('\nStack: \n' + error.stack);
    logger.error('\nRequest: \n' + req);
    logger.error('*** END ERROR LOG *** \n\n');
  
    // Output to client
    res.status(error.status);
    if (error.status == 500){
      // Hide the 500 errors to not give away security and infrastructure secrets
      res.json({
        code: error.status,
        name: error.name,
        message: "We are sorry but something went wrong on our side."});
    }
    else
    {
      // 400 errors don't log stack and request but keep a record of these errors in case they need analysis
      logger.warn('*** ERROR LOGGED BY prepareErrors ***');
      logger.warn('Date Time: '+ now.toUTCString());
      logger.warn('Error status: ' + error.status);
      logger.warn('Message: '+ error.message);
      logger.warn('*** END ERROR LOG *** \n\n');

      res.json({
        code: error.status,
        name: error.name,
        message: error.message
      });
    }
  };