const city_name = "ha noi";
const API_key = "806c10017721c07fa7a1f6804f00d0b9";
// api call for current location weather
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&lang=vi&units=metric`;

// api call for current forecast per 3 hrs/ 5 days
const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}`
const tempElement = document.getElementsByClassName("temperature")[0];
const degreeElement = document.getElementsByClassName("degree")[0];
const dateElement = document.getElementsByClassName("date")[0];
const weekdayElement = document.getElementsByClassName("weekday-n-time")[0];

// get user current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get user location (longitude & latitude)
function success(position) {
  const lon = position.coords.longitude;
  const lat = position.coords.latitude;
  const cnt = 7
  // api call for current location weather
  const CoordUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&lang=vi&units=metric`;
  
  // api call for current forecast per 3 hrs/ 5 days
  const ForecastCoordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&lang=vi&units=metric`
  
  // get data for user location weather
  fetch(CoordUrl)
    .then((res) => res.json())
    .then((data) => {
      temp = data.main.temp;
      const degree = "&deg;C";
      tempElement.innerHTML = `${Math.round(temp)}`;
      degreeElement.innerHTML = `${degree}`
    })
    .catch((error) => {
      console.error(error.message)
    });

  // api call for forecast
  fetch(ForecastCoordUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
}

// get current date
const today = new Date();
const day = today.getDate()

const options = { year: 'numeric' , day: 'numeric' , month: 'long' };
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// get current day
const d = today.getDay();
let DayofWeek
switch(d) {
  case 0:
    DayofWeek = "Sunday";
    break;
  case 1:
    DayofWeek = "Monday";
    break;
  case 2:
    DayofWeek = "Tuesday";
    break;  
  case 3:
    DayofWeek = "Wednesday";
    break;
  case 4:
    DayofWeek = "Thursday";
    break;
  case 5:
    DayofWeek = "Friday";
    break;
  case 6:
    DayofWeek = "Saturday";
    break;

}

function updateClock() {
  let today = new Date()
  let hours = today.getHours()
  let min = today.getMinutes()
  // them so 0 khi so phut be hon 10
  if(min < 10) {
    min = '0' + min;
  }
  setTimeout(updateClock, 1000)
  weekdayElement.innerHTML = `${DayofWeek} | ${hours}:${min}`
}

updateClock();

function error() {
  alert("Sorry, no position available.");
  console.log('sry, no position');
}

getLocation();
