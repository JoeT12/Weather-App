const myApiKey = ""; //insert your OpenWeatherApp API key here

window.onload = function(){ //function to be ran on loading of window
    getWeather(51.500153,-0.1262362); //default location London
    getUserLocation(); //get user location (if possible).
} 

function getWeather(locationLatitude,locationLongitude){ //gets weather data for passed location from API, displays it.
    let url = "https://api.openweathermap.org/data/2.5/weather?"; //uses openweather map API to get weather data.
    let latitude = "lat=" + locationLatitude;
    let longitude = "&lon=" + locationLongitude;
    let apiKey = "&appid=" + myApiKey;
    let file = url+latitude+longitude+apiKey+"&units=metric"; //ask for units in metric.
    fetch(file)
    .then((response) => {
        if(!response.ok){
            throw new Error("No Weather Data For Location");
        }
        return response.json();
        })
    .then((data) => displayWeather(data)); //passes JSON weather data object to displayWeather function.
}

function displayWeather(data){ //updates the GUI with the current weather for a location. data parameter is json object, inside which is weather data.
    let currentTemp = data.main.temp; //variable for each piece of weather data to be displayed on screen.
    let conditions = data.weather[0].description; //each variable fetches weather data in from data parameter.
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let iconNum = data.weather[0].icon;
    let locationName = data.name; //name of location is the location nearest to coords given.
        
    document.getElementById("temp").innerHTML = currentTemp + "°C"; //shows each value on the GUI.
    document.getElementById("conditions").innerHTML = conditions;
    document.getElementById("humidity").innerHTML = "Humidity: " + humidity + "%";
    document.getElementById("windSpeed").innerHTML = "Wind Speed: " + windSpeed + "km/h";
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + iconNum + "@2x.png";
    document.getElementById("location").innerHTML = locationName;
    document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + locationName + "')"; //updates the GUI with an image related to location.

    displayTimeData(data); //update all time data on the GUI.
}

function getUserLocation(){ //trys to use geolocation API to determine users location
    if(navigator.geolocation){ //if geolocation is enabled
        navigator.geolocation.getCurrentPosition(function(userLocation){ //passes object created (userLocation) to function, calls get weather on the location data
            getWeather(userLocation.coords.latitude,userLocation.coords.longitude);
        },console.log("Location Data is Not Currently Enabled for this Webiste")); // logs message if unable to get users location(blocked).
    }
    else{ //if browser does not support geolocation/it is blocked
        console.log("Geolocation is not supported by this browser");
    }
}

function displayTimeData(data){ //displays local time for location selected, UTC time for last update.
    let newDate = new Date();
    
    let localSeconds = ((newDate.getUTCHours()*60*60) + (newDate.getUTCMinutes()*60) + (newDate.getUTCSeconds())) + data.timezone; //use timezone offset to calculate local seconds.
    let localHours = Math.floor(localSeconds / 60 / 60); //use seconds to calculate local hours:mins
    let localMinutes = Math.floor(localSeconds / 60) - (localHours * 60);
    if(localMinutes<10){localMinutes = "0" + localMinutes;} //add 0 if mins single didgit
    document.getElementById("localTime").innerHTML = ("Local Time: " + localHours + ":" + localMinutes);// show location local time
    
    let currentUtcMins = newDate.getUTCMinutes();
    if(currentUtcMins<10){currentUtcMins = "0" + currentUtcMins;} //add 0 if mins single didgit
    document.getElementById("lastUpdated").innerHTML=("Last Updated: " + newDate.getUTCHours() + ":" + currentUtcMins + " UTC");//show last updated UTC time
}

function validateInput(userInput){ //makes sure userinput is valid i.e....
    let validInput = new RegExp('^[a-zA-Z_]*[ ]{0,1}[a-zA-Z_]*(,)?[a-zA-Z_]{0,2}?$'); //reg expression to make sure input is in correct form
    if (validInput.exec(userInput) == null){ //if input is in invalid form....
        document.getElementById("search_bar").value = ""; //empties search bar when search been made
        throw new Error("please enter a valid location / Country Code in the correct form"); //if not in correct form, dont pass to API(could cause errors)
    }
    else{ //user input valid
        return true;
    }
}

function search_location(){ //adds functionality to search bar: get the location name, its latitude and longititude. Then submits them to find weather data.
    if(validateInput(document.getElementById("search_bar").value) == false){return false;}
    let url = "http://api.openweathermap.org/geo/1.0/direct?";
    let locationName = "q=" + document.getElementById("search_bar").value;
    let limit = "&limit=1";
    let apiKey = "&appid=" + myApiKey;
    let file = url + locationName + limit + apiKey;
    fetch(file)
    .then((response) => response.json())
    .then((data) => {
        try{ //trys to get latitude/longitude from JSON object
            let locationLatitude = data[0].lat;
            let locationLongitude = data[0].lon;
            getWeather(locationLatitude,locationLongitude);
        }
        catch{ //Cant get lat/long from JSON object -> Location not found.
            throw new Error("No Location found"); //highlights issue with error
        }
    });
    document.getElementById("search_bar").value = ""; //empties search bar when search been made
}

function page_reload(){ //reload page
    window.location.reload();
}

function keypress(){ //allows user to use enter to input data into the search bar
    if (event.which == 13 || event.keyCode == 13) {search_location();} //if enter pressed...
}