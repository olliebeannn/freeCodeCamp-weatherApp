$(document).ready(function() {
  console.log("jquery loaded!");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
  }

  function getWeatherData(position) {
    // console.log(position.coords.latitude);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Update the location strings
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyB0QrfvWuvaMja9s-_qJpxgHCxMvkY5kLA
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyB0QrfvWuvaMja9s-_qJpxgHCxMvkY5kLA", function(response) {
      console.log("location request made!");
      $('.current-location').html(response.results[0].formatted_address);
      // console.log(response);
    });

    $('.location').html("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);

    //Make request for weather using lat and lon params and print
    //https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/
    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/" + lat + "," + lon, function(response) {
      console.log("weather request made!");
      console.log(response);
      showForecast(response);
    });
  }
});

function showForecast(data) {
  var fullForecast = data.daily.data;
  fullForecast.forEach(function(dayForecast, index) {
    showDayForecast(dayForecast, index);
  });
};

function showDayForecast(data, index) {
  var skycons = new Skycons({"color": "black"});
  // skycons.add("icon1", Skycons.RAIN);

  // Create date output strings
  var day = moment.unix(data.time);
  var dayOfWeek = "<p class='mb-1 day-forecast__day'>" + day.format("dddd") + "</p>";
  var dateString = "<h3 class='mb-0'>" + day.format("MMM Do") + "</h3>";

  // Create weather detail output strings
  var temperatureString = "<h3 class='mb-1'>" + Math.round(data.apparentTemperatureMax) + "F / " + Math.round(data.apparentTemperatureMin) + "F" + "</h3>";
  var descriptionString = "<p class='mb-0'>" + data.summary + "</p>";
  var rainString = "<p class='mb-0'>" + data.precipProbability*100 + "% chance of rain" + "</p>";

  // Create day forecast container
  var newElementHtml = "<div class='row day-forecast'>";

  // Add date column and info
  newElementHtml += "<div class='col-sm-3'>" + dayOfWeek + dateString + "</div>";

  // Add container for Skycons. Add the skycon after HTML is appended
  var canvasName = "icon_" + index;
  newElementHtml += "<div class='col-sm-3'>" + "<canvas id='" + canvasName + "' width='128' height='128'></canvas>" + "</div>";

  // Add weather details
  newElementHtml += "<div class='col-sm-6'>" + temperatureString + descriptionString + rainString + "</div>";

  newElementHtml += "</div>"

  $('#forecast-display').append(newElementHtml);

  // Add appropriate Skycon (after the canvas has actually been appended)
  skycons.add(canvasName, data.icon);
  skycons.play();
}
