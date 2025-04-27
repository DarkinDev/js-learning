const city_name = "ha noi";
const API_key = "806c10017721c07fa7a1f6804f00d0b9";
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&lang=vi&units=metric`;

let iniData;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;

  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);

  const CoordUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&lang=vi&units=metric`;

  fetch(CoordUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      iniData = data;
    });
}

function error() {
  alert("Sorry, no position available.");
}

getLocation();
