// require ConvertHandler module
var ConvertHandler = require('../controllers/convertHandler.js');

// export this module
module.exports = function (app) {
  // create new ConvertHandler instance
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      var input = req.query.input; // get user input from query
      var initNum = convertHandler.getNum(input); // get the digit from the input
      var initUnit = convertHandler.getUnit(input); // get the unit from the input
      var returnNum = convertHandler.convert(initNum, initUnit); // perform conversion
      var returnUnit = convertHandler.getReturnUnit(initUnit); // get the converted unit
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit); // get the result string
      
      // return the result as JSON
      res.json(toString);
    });

};