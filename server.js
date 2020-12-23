// Setup empty JS object to act as endpoint for all routes
projectData = {}

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));
const port = 3000;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};





//GET route that returns the projectData object
app.get('/projectDataEndpoint', sendData)

function sendData (request, response) {
    response.send(projectData)
    console.log("here")
}

// POST route
// app.post('/addWeatherData', addData)
app.post('/projectDataEndpoint', addData)


function addData(request, response) {
    console.log(request.body)
    entry = {
        date: request.body.date,
        temperature: request.body.temperature,
        content: request.body.content
    }
    projectData = entry;
    response.end();
}