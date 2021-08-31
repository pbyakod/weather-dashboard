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
    windEl.textContent = data.current['wind-speed'];
    checkUVIcolor(uvIndexEl);
    uvIndexEl.textContent = data.current['uv-index'];
}

// checking what level of uvIndex the city's currently at
function checkUVIcolor(uvIndexEl) {
    if(uvIndexEl <= 2) {
        uvIndexEl.setAttribute('style', 'background-color: green');
    } else if(uvIndexEl > 2 && uvIndexEl <= 5) {
        uvIndexEl.setAttribute('style', 'background-color: yellow');
    } else {
        uvIndexEl.setAttribute('style', 'background-color: red');
    }
}

function fiveDayForecast(data) { 
    var day1El = document.getElementById('#day-1');
    var icon1Img = document.getElementById('#icon-1');
    var icon1Text = forecast.daily[1].weather[0].icon;
    var humidity1El = document.getElementById('#humidity-1');

    var day2El = document.getElementById('#day-2');
    var icon2Img = document.getElementById('#icon-2');
    var icon2Text = forecast.daily[2].weather[0].icon;
    var humidity2El = document.getElementById('#humidity-2');

    var day3El = document.getElementById('#day-3');
    var icon3Img = document.getElementById('#icon-3');
    var icon3Text = forecast.daily[3].weather[0].icon;
    var humidity3El = document.getElementById('#humidity-3');

    var day4El = document.getElementById('#day-4');
    var icon4Img = document.getElementById('#icon-4');
    var icon4Text = forecast.daily[4].weather[0].icon;
    var humidity4El = document.getElementById('#humidity-4');

    var day5El = document.getElementById('#day-5');
    var icon5Img = document.getElementById('#icon-5');
    var icon5Text = forecast.daily[5].weather[0].icon;
    var humidity5El = document.getElementById('#humidity-5');

    var index = 1;
    while (index < 6) {
        if(index == 1) {
            day1El.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
            icon1Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon1Text}.png`);
            icon1Img.setAttribute('alt', forecast.daily[1].weather[0].main);
            humidity1El.textContent = data.daily[1].humidity
        }
        if(index == 2) {
            day2El.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
            icon2Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon2Text}.png`);
            icon2Img.setAttribute('alt', forecast.daily[2].weather[0].main);
            humidity2El.textContent = data.daily[2].humidity
        }
        if(index == 3) {
            day3El.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
            icon3Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon3Text}.png`);
            icon3Img.setAttribute('alt', forecast.daily[3].weather[0].main);
            humidity3El.textContent = data.daily[3].humidity
        }
        if(index == 4) {
            day4El.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
            icon4Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon4Text}.png`);
            icon4Img.setAttribute('alt', forecast.daily[4].weather[0].main);
            humidity4El.textContent = data.daily[4].humidity
        }
        if(index == 5) {
            day5El.textContent = moment().add(5, 'days').format('MM/DD/YYYY');
            icon5Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon5Text}.png`);
            icon5Img.setAttribute('alt', forecast.daily[5].weather[0].main);
            humidity5El.textContent = data.daily[5].humidity
        }
    }
}
