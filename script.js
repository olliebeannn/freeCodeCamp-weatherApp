$(document).ready(function() {
  console.log("working!");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
  }

  function getWeatherData(position) {
    console.log(position.coords.latitude);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $('.location').html("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);

    //Make request for weather using lat and lon params and print
    //https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/
    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/" + lat + "," + lon, function(response) {
      console.log(response);
      showForecast(response);
    });
  }
});

function showForecast(data) {
  var fullForecast = data.daily.data;
  fullForecast.forEach(function(dayForecast) {
    showDayForecast(dayForecast);
  });
};

function showDayForecast(data) {
  // console.log("day forecast function");
  var day = moment.unix(data.time);
  var dayOfWeek = "<p class='mb-0'>" + day.format("dddd") + "</p>";
  var dateString = "<p class='mb-0'>" + day.format("MMM Do") + "</p>";

  var temperatureString = "<p class='mb-0'>" + Math.round(data.apparentTemperatureMin) + "F / " + Math.round(data.apparentTemperatureMax) + "F" + "</p>";

  var descriptionString = "<p class='mb-0'>" + data.summary + "</p>";

  var rainString = "<p class='mb-0'>" + data.precipProbability*100 + "% chance of rain" + "</p>";

  var newElementHtml = "<div class='row day-forecast'>";

  // Add date column and info
  newElementHtml += "<div class='col-sm-6'>" + dayOfWeek + dateString + "</div>";

  // Add weather details
  newElementHtml += "<div class='col-sm-6'>";
  newElementHtml += temperatureString;
  newElementHtml += descriptionString;
  newElementHtml += rainString;
  newElementHtml += "</div>";

  newElementHtml += "</div>"

  $('#forecast-display').append(newElementHtml);
}
