module.exports = function(error, req, res, next) {

    // Log the error
    // Make less verbose (comment out outputting stack and req)
    // Errors logged will appear in Cloudwatch Stream
    console.log('***')
    console.log('Error status: ', error.status);
    console.log('Message: ', error.message);
    console.log('Stack: ', error.stack);
    //console.log(req)
    console.log('***');
  
    // Output to client
    res.status(error.status);
    if (error.status == 500){
      // Hide the 500 errors to not give away security and infrastructure secrets
      res.json({message: "We are sorry but something went wrong on our side."});
    }
    else
    {
      res.json({ message: error.message });
    }
  };