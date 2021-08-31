// retrieving personal API Key from OpenWeatherMap
var apiKey = '5bb247e859e7286ce819d565b7087d25';

// getting elements by their html id
var enteredCityEl = document.getElementById('#entered-city');

// defining a local storage array to save cities
var localStoreArray = [];

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
function findLatLon (readable, apiKey) {
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
function getWeather (readable, longitude, latitude, apiKey) {
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
        fiveDayForecast(data);
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
    if(uvIndexEl <= 3) {
        uvIndexEl.setAttribute('style', 'background-color: green');
    } else if(uvIndexEl > 3 && uvIndexEl <= 6) {
        uvIndexEl.setAttribute('style', 'background-color: yellow');
    } else {
        uvIndexEl.setAttribute('style', 'background-color: red');
    }
}

function fiveDayForecast(data) { 
    // html elements for day-1
    var day1El = document.getElementById('#day-1');
    var icon1Img = document.getElementById('#icon-1');
    var icon1Text = forecast.daily[1].weather[0].icon;
    var humidity1El = document.getElementById('#humidity-1');
    var maxTemp1El = document.getElementById('#max-1');
    var minTemp1El = document.getElementById('#max-1');
    // html elements for day-2
    var day2El = document.getElementById('#day-2');
    var icon2Img = document.getElementById('#icon-2');
    var icon2Text = forecast.daily[2].weather[0].icon;
    var humidity2El = document.getElementById('#humidity-2');
    var maxTemp2El = document.getElementById('#max-2');
    var minTemp2El = document.getElementById('#max-2');
    // html elements for day-3
    var day3El = document.getElementById('#day-3');
    var icon3Img = document.getElementById('#icon-3');
    var icon3Text = forecast.daily[3].weather[0].icon;
    var humidity3El = document.getElementById('#humidity-3');
    var maxTemp3El = document.getElementById('#max-3');
    var minTemp3El = document.getElementById('#max-3');
    // html elements for day-4
    var day4El = document.getElementById('#day-4');
    var icon4Img = document.getElementById('#icon-4');
    var icon4Text = forecast.daily[4].weather[0].icon;
    var humidity4El = document.getElementById('#humidity-4');
    var maxTemp4El = document.getElementById('#max-4');
    var minTemp4El = document.getElementById('#max-4');
    // html elements for day-5
    var day5El = document.getElementById('#day-5');
    var icon5Img = document.getElementById('#icon-5');
    var icon5Text = forecast.daily[5].weather[0].icon;
    var humidity5El = document.getElementById('#humidity-5');
    var maxTemp5El = document.getElementById('#max-5');
    var minTemp5El = document.getElementById('#max-5');
    // looping through each day
    var index = 1;
    while (index < 6) {
        // adding the data to the html page for each day
        if(index == 1) {
            day1El.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
            icon1Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon1Text}.png`);
            icon1Img.setAttribute('alt', data.daily[1].weather[0].main);
            maxTemp1El.textContent = data.daily[1].max;
            minTemp1El.textContent = data.daily[1].min;
            humidity1El.textContent = data.daily[1].humidity
        }
        else if(index == 2) {
            day2El.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
            icon2Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon2Text}.png`);
            icon2Img.setAttribute('alt', data.daily[2].weather[0].main);
            maxTemp2El.textContent = data.daily[2].max;
            minTemp2El.textContent = data.daily[2].min;
            humidity2El.textContent = data.daily[2].humidity
        }
        else if(index == 3) {
            day3El.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
            icon3Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon3Text}.png`);
            icon3Img.setAttribute('alt', data.daily[3].weather[0].main);
            maxTemp3El.textContent = data.daily[3].max;
            minTemp3El.textContent = data.daily[3].min;
            humidity3El.textContent = data.daily[3].humidity
        }
        else if(index == 4) {
            day4El.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
            icon4Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon4Text}.png`);
            icon4Img.setAttribute('alt', data.daily[4].weather[0].main);
            maxTemp4El.textContent = data.daily[4].max;
            minTemp4El.textContent = data.daily[4].min;
            humidity4El.textContent = data.daily[4].humidity
        }
        else if(index == 5) {
            day5El.textContent = moment().add(5, 'days').format('MM/DD/YYYY');
            icon5Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon5Text}.png`);
            icon5Img.setAttribute('alt', data.daily[5].weather[0].main);
            maxTemp5El.textContent = data.daily[5].max;
            minTemp5El.textContent = data.daily[5].min;
            humidity5El.textContent = data.daily[5].humidity
        }
        // incrementing the index
        index = index + 1;
    }
}

// loading cities into local storage and excluding any duplicates for memory efficiency
function updateLocalStorage(readable) {
    var index = 0;
    while(index < localStorageArray.length) {
        if(readable === localStoreArray[i]) {
            localStoreArray.splice(i, 1);
        }
        index = index + 1;
    }
}

function uploadLocalStorage() {
    localStoreArray = JSON.parse(localStorage.getItem('Searched City:'));

    var searchHistoryEl = document.getElementById('#search-history');
    var searchedCityList = document.createElement('ul');
    searchedCityList.className = 'list-group list-group-flush city-history';
    searchHistoryEl.appendChild(searchedCityList);

    var index = 0;
    while(index < localStorageArray.length) {
        var prevCityBtn = document.createElement('button');
        prevCityBtn.className = 'list-group-item';
        prevCityBtn.setAttribute('type', 'button');
        prevCityBtn.setAttribute('value', localStorageArray[i]);
        searchedCityList.prepend(prevCityBtn);
        index = index + 1;
    }

}