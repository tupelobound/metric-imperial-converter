// set up
const express = require('express')
const app = express()
const port = 3000

var apiRoutes = require('./routes/api.js');

// serve static assets from the 'public' directory
app.use(express.static('public'))

//Routing for API 
apiRoutes(app);

// listen for requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})