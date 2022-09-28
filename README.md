# Weather-App
A weather app created using MDB, geolocation and the OpenWeatherMap API. Please place your own OpenWeatherMap API key at the start of the weather_app.js script or the program will not function as intended. Unsplash.com is also used to get relevant images to show behind the weather data.
# Function
- Able to use the users current location (permission depending) to show local weather data. If the browser does not support geolocation, or the user opts to block location data to the file, the programs default weather location is London.
- Able to show weather of any chosen location (using search bar). 
- Background image shown, relating to the chosen location. 
- Weather data shown includes: Temperature, wind speed, humidity and current conditions.
- Shows local time for the chosen location, and the time the data was last updated in UTC form.
# NOTE
Due to regular expressions being used to validate the input of the search bar, the user must input in the form (cityname,country code), or (cityname). if the user does not do this, an error is thrown. This is to ensure that the link used to fetch the data from the API is concatenated in the correct order. Please note the country code is optional, and is only mainly used when a location with the same name is present within two different countries.
# Screenshots of Program Working
![image](https://user-images.githubusercontent.com/108418412/192860140-93e2344b-9e43-4e0c-8c13-e4da7c3f0e45.png)
![image](https://user-images.githubusercontent.com/108418412/192860965-d0c3e10e-d817-4506-ba37-442f5a9e3dd9.png)


