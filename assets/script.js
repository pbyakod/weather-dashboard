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
    var cityName = readableName.join(" ");
    return cityName.join(" ");
}