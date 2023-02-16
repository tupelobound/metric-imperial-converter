// set up
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const apiRoutes = require('./routes/api.js')
// const fccTestingRoutes  = require('./routes/fcctesting.js')
const runner = require('./test-runner')
const helmet = require('helmet')

app.use(helmet()) // use helmet security

// app.use(cors({origin: '*'})); //For FCC testing purposes only

// serve static assets from the 'public' directory
app.use(express.static('public'))

//For FCC testing purposes
// fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

// listen for requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  };
})

module.exports = app; //for testing