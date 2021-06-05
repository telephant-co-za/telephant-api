const createError = require('http-errors');

module.exports = function(req, res, next) {

    if (typeof res.locals.message == "undefined")
    {
      throw createError(404, `For this API, you haven't specified a valid route (${req.path}). For more details, go to http://developer.telephant.co.za.`, { expose: false });
    }
    else
    {
      next();
    }

};