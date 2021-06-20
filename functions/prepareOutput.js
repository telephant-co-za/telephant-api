const Jsontableify = require('jsontableify');
const converter = require('json-2-csv');
const createError = require('http-errors');

module.exports = function(req, res, next) {

    // This prepares the res for delivery based on the requested format
    res.format({
      'text/plain' : function(){
          res.status(200).send(res.locals);
      },
      'text/html' : function(){
          // strip off the pagination stuff if it is there
          if (res.locals.results) { var output = res.locals.results;} else { var output = res.locals;}
          
          // strip off all the weird objet grbage mongoose leaves
          var json = JSON.stringify(output);

          // turn the string back into a useful array of obects to convert to csv
          const obj = JSON.parse(json);
          
          const { html } = new Jsontableify({
              dateFormat: 'DD-MM-YYYY',
          }).toHtml(obj);
          // Creates a nice looking html table listing
          
          res.status(200).send(html);
      },
      'application/json' : function(){
        res.status(200).json(res.locals);
      },
      'text/csv' : function(){
        // strip off the pagination stuff if it is there
        if (res.locals.results) { var output = res.locals.results;} else { var output = res.locals;}
        
        // strip off all the weird objet grbage mongoose leaves
        var json = JSON.stringify(output);

        // turn the string back into a useful array of obects to convert to csv
        const obj = JSON.parse(json);
    
        console.log(json);
        // convert JSON array to CSV string
        converter.json2csv(obj, (err, csv) => {
        if (err) {
          throw err;
        }
        res.status(200).send(csv);
        });
      },
      default : function(){
        throw createError(406, `The format you requested is not acceptable. For more details, go to http://developer.telephant.co.za.`)
      },
    });
  };
