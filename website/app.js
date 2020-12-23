/* Global Variables */
const key = '&appid=2801360c0366b677f5ef6be5eaa17f96&units=imperial';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let d = new Date();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


// Create a new date instance dynamically with JS



//Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);  //1 CLICK


//Function called by event listener
function performAction(e) {  //1 CLICK EVENT FUNCT
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newZip);
    console.log(feelings);
    getWeather(baseURL, newZip, key)  //2 CALL WEB API AND GET DATA
        .then(function(data) {
            console.log("HERE" + data);
            //ADD data to POST request
            postData('http://localhost:3000/projectDataEndpoint', {date:d, temperature:data.main.temp, content:feelings}) //3 SAVE DATA TO OBJECT IN LOCAL SERVER
            updateUi(); //4 UPDATE VIEW
        })
};

//Function to GET Web API Data
const getWeather = async(baseURL, zip, key) => {
    console.log(baseURL + zip + key)
    const res = await fetch(baseURL + zip + key)
    // console.log(res.data.json());
    try {
        const data = await res.json();
        console.log(data);
        console.log("here");
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

//Function to POST Data
const postData = async ( url = '', data = {}) => {
        console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*', 
            'Access-Control-Allow-Credentials' : true 
        },
        //Body data type must watch "Content-Type" header
            body: JSON.stringify(data)
    });

    try {
        const newData = await response;
            return newData;
    } catch(error) {
        console.log("error", error);
    }
}

//Function to GET Project data
const updateUi = async () => {
    console.log("64");
    const request = await fetch('http://localhost:3000/projectDataEndpoint');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
    } catch(error) {
        console.log(error)
    }
}