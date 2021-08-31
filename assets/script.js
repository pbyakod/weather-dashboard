// retrieving personal API Key from OpenWeatherMap
var apiKey = '5bb247e859e7286ce819d565b7087d25';

// getting elements by their html id
var enteredCityEl = document.getElementById('entered-city');
var readableEl = document.getElementById('city-name');
var searchHistoryEl = document.getElementById('search-history');
var searchedCityList = document.createElement('ul');

// defining a local storage array to save cities
var localStoreArray = [];

// converting the entered city name into a computer readable format
var readableCity = function () {
    var readable = enteredCityEl.value.trim().toLowerCase().split(' ').map((str) => str.charAt(0).toUpperCase() + str.substring(1)).join(' ');
    // if the city name is readable then move to findLatLon function
    if(readable) {
        findLatLon(readable);
    } else {
        console.log("ERROR! Unable to read city name");
    }
}

// using the city name to find its respective latitude and longitude
var findLatLon = function (readable) {
    // fetch the api link
    var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${readable}&units=imperial&appid=${apiKey}`;
    fetch(apiLink)
    .then(function(response) {
        // if the api is fetched successfully, retrieve the latitude and logitude from the dataset
        if (response.ok) {
            response.json()
            .then(function(data) {
                var longitude = data.coord['lon'];
                var latitude = data.coord['lat'];
                // use the coordinates to pinpoint location in getWeather function
                getWeather(readable, longitude, latitude);
                // updates the local storage with the new city inputted
                updateLocalStorage(readable);
                uploadLocalStorage();
            })
            .catch(function(err) {
                console.log("ERROR!", err);
            })
        }
    });
}

// retrieving the weather data off the coordinated
var getWeather = function (readable, longitude, latitude) {
    // fetching the coordiates api link
    var apiCoordLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
    fetch(apiCoordLink)
    .then(function (response) {
        // if fetched successfully, return the city name and current date
        if(response.ok) {
            response.json()
            .then(function (data) {
                readableEl.textContent = `Selected City: ${readable} ${moment().format("M/D/YYYY")}`; 
                // move on to presenting both current weather and five day forecast
                presentForecast(data);
                fiveDayForecast(data);
            })
        }
    })
}

// creating function to display the current forecast data for that city
var presentForecast = function (data) {
    // list of local elements grabbed from html
    var forecastEl = document.getElementById('forecast');
    var weatherIconEl = document.getElementById('weather-icon');
    var tempEl = document.getElementById('temperature');
    var humidityEl = document.getElementById('humidity');
    var windEl = document.getElementById('wind-speed');
    var uvIndexEl = document.getElementById('uv-index');
    // revealing the forecast column we initially hid
    forecastEl.classList.remove('minimize');
    // displaying the openweathermap icons for that city's weather
    var displayIcon = data.current.weather[0].icon;
    weatherIconEl.setAttribute('src', `http://openweathermap.org/img/wn/${displayIcon}.png`);
    weatherIconEl.setAttribute('alt', data.current.weather[0].main);
    // displaying the temp, humidity, windspeed and uv index of that city
    tempEl.textContent = data.current['temp'];
    humidityEl.textContent = data.current['humidity'];
    windEl.textContent = data.current['wind_speed'];
    uvIndexEl.textContent = data.current['uvi'];
    
}

var fiveDayForecast = function (data) { 
    // html elements for day-1
    var day1El = document.getElementById('day-1');
    var icon1Img = document.getElementById('icon-1');
    var icon1Text = data.daily[1].weather[0].icon;
    var humidity1El = document.getElementById('humidity-1');
    var maxTemp1El = document.getElementById('max-1');
    var minTemp1El = document.getElementById('min-1');
    // html elements for day-2
    var day2El = document.getElementById('day-2');
    var icon2Img = document.getElementById('icon-2');
    var icon2Text = data.daily[2].weather[0].icon;
    var humidity2El = document.getElementById('humidity-2');
    var maxTemp2El = document.getElementById('max-2');
    var minTemp2El = document.getElementById('min-2');
    // html elements for day-3
    var day3El = document.getElementById('day-3');
    var icon3Img = document.getElementById('icon-3');
    var icon3Text = data.daily[3].weather[0].icon;
    var humidity3El = document.getElementById('humidity-3');
    var maxTemp3El = document.getElementById('max-3');
    var minTemp3El = document.getElementById('min-3');
    // html elements for day-4
    var day4El = document.getElementById('day-4');
    var icon4Img = document.getElementById('icon-4');
    var icon4Text = data.daily[4].weather[0].icon;
    var humidity4El = document.getElementById('humidity-4');
    var maxTemp4El = document.getElementById('max-4');
    var minTemp4El = document.getElementById('min-4');
    // html elements for day-5
    var day5El = document.getElementById('day-5');
    var icon5Img = document.getElementById('icon-5');
    var icon5Text = data.daily[5].weather[0].icon;
    var humidity5El = document.getElementById('humidity-5');
    var maxTemp5El = document.getElementById('max-5');
    var minTemp5El = document.getElementById('min-5');
    // looping through each day
    var index = 1;
    while (index < 6) {
        // adding the data to the html page for each day
        if(index == 1) {
            day1El.textContent = moment().add(1, 'days').format('MM/DD/YYYY');
            icon1Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon1Text}.png`);
            icon1Img.setAttribute('alt', data.daily[1].weather[0].main);
            maxTemp1El.textContent = data.daily[1].temp.max;
            minTemp1El.textContent = data.daily[1].temp.min;
            humidity1El.textContent = data.daily[1].humidity
        }
        else if(index == 2) {
            day2El.textContent = moment().add(2, 'days').format('MM/DD/YYYY');
            icon2Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon2Text}.png`);
            icon2Img.setAttribute('alt', data.daily[2].weather[0].main);
            maxTemp2El.textContent = data.daily[2].temp.max;
            minTemp2El.textContent = data.daily[2].temp.min;
            humidity2El.textContent = data.daily[2].humidity
        }
        else if(index == 3) {
            day3El.textContent = moment().add(3, 'days').format('MM/DD/YYYY');
            icon3Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon3Text}.png`);
            icon3Img.setAttribute('alt', data.daily[3].weather[0].main);
            maxTemp3El.textContent = data.daily[3].temp.max;
            minTemp3El.textContent = data.daily[3].temp.min;
            humidity3El.textContent = data.daily[3].humidity
        }
        else if(index == 4) {
            day4El.textContent = moment().add(4, 'days').format('MM/DD/YYYY');
            icon4Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon4Text}.png`);
            icon4Img.setAttribute('alt', data.daily[4].weather[0].main);
            maxTemp4El.textContent = data.daily[4].temp.max;
            minTemp4El.textContent = data.daily[4].temp.min;
            humidity4El.textContent = data.daily[4].humidity
        }
        else if(index == 5) {
            day5El.textContent = moment().add(5, 'days').format('MM/DD/YYYY');
            icon5Img.setAttribute('src', `http://openweathermap.org/img/wn/${icon5Text}.png`);
            icon5Img.setAttribute('alt', data.daily[5].weather[0].main);
            maxTemp5El.textContent = data.daily[5].temp.max;
            minTemp5El.textContent = data.daily[5].temp.min;
            humidity5El.textContent = data.daily[5].humidity
        }
        // incrementing the index
        index = index + 1;
    }
}

// loading cities into local storage and excluding any duplicates for memory efficiency
var updateLocalStorage = function (readable) {
    var index = 0;
    // making sure there arent any duplicate entries in the console
    while(index < localStoreArray.length) {
        if(readable === localStoreArray[index]) {
            localStoreArray.splice(index, 1);
        }
        index = index + 1;
    }
    // pushing entries into localstorage array
    localStoreArray.push(readable);
    console.log(localStoreArray)
    localStorage.setItem('cities', JSON.stringify(localStoreArray));
}

// displaying thee local storage on the browser
var uploadLocalStorage = function () {
    localStoreArray = JSON.parse(localStorage.getItem('cities'));
    // creating a bootstrap card list under searchhistory to display the cities
    searchedCityList.className = 'list-group list-group-flush';
    searchedCityList.id = 'city-history';
    // appending the entered cities to the list
    searchHistoryEl.appendChild(searchedCityList);

    var index = 0;
    while(index < localStoreArray.length) {
        // displaying the cities in the form of buttons so that users can click back to weather instead of retyping
        var prevCityBtn = document.createElement('button');
        prevCityBtn.className = 'list-group-item';
        prevCityBtn.setAttribute('type', 'button');
        prevCityBtn.setAttribute('value', localStoreArray[index]);
        prevCityBtn.textContent = localStoreArray[index];
        searchedCityList.prepend(prevCityBtn);
        index = index + 1;
    }
    // uploading refreshed local storage to new list
    var cityHistoryEl = document.getElementById('city-history');
    cityHistoryEl.addEventListener('click', storeCity);
}

// storing the cities entered onto the browser
var storeCity = function (event) {
    var selectedCity = event.target.getAttribute('value');
    findLatLon(selectedCity);
}

// calling functions to start program
var searchBtnEl = document.getElementById('search-btn');
searchBtnEl.addEventListener("click", readableCity);

