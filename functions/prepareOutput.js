const Jsontableify = require('jsontableify');
const converter = require('json-2-csv');
const createError = require('http-errors');

module.exports = function(req, res, next) {
    // This prepares the res for delivery based on the requested format
    res.format({
      'text/plain' : function(){
        res.status(res.locals.code).send(res.locals.message);
      },
      'text/html' : function(){
  
          const { html } = new Jsontableify({
              dateFormat: 'DD-MM-YYYY',
          }).toHtml(res.locals.message.Items);
          // Creates a nice looking html table listing
          // Not HTML primary purpose of API to render html so won't spend too much time on this
  
        res.status(res.locals.code).send(html);
  
      },
      'application/json' : function(){
        res.status(res.locals.code).json(res.locals.message);
      },
      'text/csv' : function(){
        // convert JSON array to CSV string
        converter.json2csv(res.locals.message.Items, (err, csv) => {
        if (err) {
          throw err;
        }
        res.status(res.locals.code).send(csv);
        });
      },
      default : function(){
        throw createError(406, `The format you requested is not acceptable. For more details, go to http://developer.telephant.co.za.`)
      },
    });
  };
