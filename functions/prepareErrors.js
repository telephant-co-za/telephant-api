module.exports = function(error, req, res, next) {

    // Log the error
    // Make less verbose (comment out outputting stack and req)

    var now = new Date();

    console.log('\n\n*** ERROR LOGGED BY prepareErrors ***');
    console.log('\nDate Time:', now.toUTCString());
    console.log('\nError status:', error.status);
    console.log('\nMessage: ', error.message);
    //console.log('\nStack: \n', error.stack);
    //console.log('\nRequest: \n',req);
    console.log('*** END ERROR LOG *** \n\n');
  
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
      res.json({
        code: error.status,
        name: error.name,
        message: error.message
      });
    }
  };