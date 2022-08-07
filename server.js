// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));





// POST route
app.post('/add', addData)
function addData(req, res){
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}
// Get route
app.get('/all', getDate);
function getDate(req, res){
    res.send(projectData);
}


// Setup Server
const port = 8080;
const server = app.listen(port, appListener);
function  appListener() {
    console.log(`server is listening on port: ${port}`);
}