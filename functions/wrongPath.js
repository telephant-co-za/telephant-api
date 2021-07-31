const createError = require('http-errors');

module.exports = function(req, res, next) {

    if (res.locals == null)
    {
      const err = createError(405, `For this API, you haven't specified a valid route. For more details, go to http://developer.telephant.co.za.`, { expose: false });
      return next(err);
    }
    else
    {
      next();
    }
};