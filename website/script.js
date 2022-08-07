/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=89329827231da2cbdffa790b6fefe561&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add func to html element
const btn = document.getElementById('generate');
btn.addEventListener('click', performActon);

function performActon(){
    //input
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    if (zipCode !== ''){
        getWeatherData(baseUrl, zipCode, apiKey)
        .then(function(data){
            // add req date
            postData('http://localhost:8080/add', { temp: data.main.temp, date: newDate, content: content });
        }).then(function(){
            updateUI()
        }).catch(function(e){
            console.log('error', e);
        })
    }else{
        alert('Please Enter Zip Code')
    }

}

// func to get data
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    const res_GEt = await fetch(baseUrl + zipCode+ apiKey);
    try{
        const data = await res_GEt.json();
        return data;
    } catch(e){
        console.log('error', e);
    }
}

//fun to post data
const postData = async(url = '', data = {}) => {
    const req_POST = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });
    try{
        const newData = await req_POST.json();
        return newData
    } catch (e){
        console.log('error', e)
    }
    
};

// func Get date and update 
const updateUI = async() => {
    const req = await fetch('http://localhost:8080/all');
    try{
        const allData = await req.json();
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = `Data: ${allData.date}`;
            document.getElementById('temp').innerHTML = `Temp: ${allData.temp}  ' degree C'`;
            document.getElementById('content').innerHTML = `Content: ${allData.content}`;
        }
    } catch(e){
        console.log('error', e)
    }
};
