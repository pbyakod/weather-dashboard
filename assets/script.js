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
    })
}