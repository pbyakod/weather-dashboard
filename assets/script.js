// retrieving personal API Key from OpenWeatherMap
var apiKey = '5bb247e859e7286ce819d565b7087d25';

// getting elements by their html id
const enteredCityEl = document.getElementById('#entered-city');

// converting the entered city name into a computer readable format
function readableCity(enteredCityEl) {
    var readableName = enteredCityEl.toLowerCase().split(" ");
    var position = 0;
    while (position < readableName.length) {
        readableName[position] = readableName[position][0].toUpperCase();
        readableName[position] += readableName[position].slice(1);
        position = position + 1;
    }
    var readable = readableName.join(" ");
    return readable.join(" ");
}

// using the city name to find its respective latitude and longitude
var findLatLon = function(readable, apiKey) {
    var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${readable}&units=imperial&appid=${apiKey}`;
    fetch(apiLink)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
                var longitude = data.coord['lon'];
                var latitude = data.coord['lat'];
                getWeather(longitude, latitude, apiKey);
            })
            .catch(function(err) {
                alert("ERROR!", err);
            })
        }
    });
}

// retrieving the weather data off the coordinated
var getWeather= function(readable, longitude, latitude, apiKey) {
    var apiCoordLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    fetch(apiCoordLink)
    .then((response) => {
        if(response.ok) {
            return response.json();
        } else {
            console.log("ERROR! response not fetched")
        }
    })
    .then((data) => {
        readableEl.textContent = `${readable} ${moment().format("M/D/YYYY")}`; 
        presentForecast(data);
    })
}

// creating function to display the current forecast data for that city
function presentForecast(data) {
    // list of local elements grabbed from html
    var forecastEl = document.getElementById('#forecast');
    var weatherIconEl = document.getElementById('#weather-icon');
    var tempEl = document.getElementById('#temperature');
    var humidityEl = document.getElementById('#humidity');
    var windEl = document.getElementById('#wind-speed');
    var uvIndexEl = document.getElementById('#uv-index');
    // revealing the forecast column we initially hid
    forecastEl.classList.remove('minimize');
    // displaying the openweathermap icons for that city's weather
    var displayIcon = data.current.weather[0].icon;
    weatherIconEl.setAttribute('src', `http://openweathermap.org/img/wn/${displayIcon}.png`);
    weatherIconEl.setAttribute('alt', data.current.weather[0].main);
    // displaying the temp, humidity, windspeed and uv index of that city
    tempEl.textContent = data.current['humidity'];
    humidityEl.textContent = data.current['humidity'];
    windEl.textContent = data.current['wind_speed'];
    checkUVIcolor(uvIndexEl);
    uvIndexEl.textContent = data.current['uv-index'];
}

// checking what level of uvIndex the city's currently at
function checkUVIcolor(uvIndexEl) {
    if(uvIndexEl <= 2) {
        uvIndexEl.style.color = "green";
    } else if(uvIndexEl > 2 && uvIndexEl <= 5) {
        uvIndexEl.style.color = "yellow";
    } else {
        uvIndexEl.style.color = "red";
    }
}

