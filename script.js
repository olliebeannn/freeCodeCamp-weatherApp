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

    //Make request for weather and print
    //https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/
    $.getJSON("https://api.darksky.net/forecast/ca6136574e3da0e0a583474d13934794/" + lat + "," + lon, function(response) {
      console.log(response);
    });
  }
});
