$(document).ready(function() {
  console.log("working!");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(location) {
    console.log(location.coords.latitude);
  }
});
