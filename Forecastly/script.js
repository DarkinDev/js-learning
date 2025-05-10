const city_name = "ha noi";
const API_key = "806c10017721c07fa7a1f6804f00d0b9";
// api call for current location weather
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;

// api call for current forecast per 3 hrs/ 5 days
const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}`;

const locationElement = document.getElementsByClassName("location")[0];
const tempElement = document.getElementsByClassName("temperature")[0];
const degreeElement = document.getElementsByClassName("degree")[0];
const dateElement = document.getElementsByClassName("date")[0];
const weekdayElement = document.getElementsByClassName("weekday-n-time")[0];
const windElement = document.getElementsByClassName("windData")[0];
const rainElement = document.getElementsByClassName("rainData")[0];

// get current date
const today = new Date();
const day = today.getDate();

const options = { year: "numeric", day: "numeric", month: "long" };
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// get current day
const d = today.getDay();
let DayofWeek;

function getWeather() {
  const city_name = "ha noi";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`;

  const ForecastCoordUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}&units=metric`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temp = data.main.temp;
      const degree = "&deg;C";
      tempElement.innerHTML = `${Math.round(temp)}`;
      degreeElement.innerHTML = `${degree}`;
    });

  fetch(ForecastCoordUrl)
    .then((res) => res.json())
    .then((data) => {
      const citydata = data.city.name;
      locationElement.innerHTML = citydata;
      const windspeed = data.list[1].wind.speed;
      windElement.innerHTML = `${windspeed} m/s`;
      // Filter the forecast data to find rain forecasts
      const rainForecasts = data.list.filter(
        (item) => item.rain && item.rain["3h"]
      );
      console.log("Rain forecasts:", rainForecasts);

      // Display the first rain forecast's data
      if (rainForecasts.length > 0) {
        const firstRain = rainForecasts[0];
        rainElement.innerHTML = `${firstRain.rain["3h"]} mm`;
      } else {
        rainElement.innerHTML = "0.01 mm";
      }

      const dataList = data.list;

      createCardElement(dataList);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

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
  // api call for current location weather
  const CoordUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;

  // get data for user location weather
  fetch(CoordUrl)
    .then((res) => res.json())
    .then((data) => {
      const temp = data.main.temp;
      const degree = "&deg;C";
      tempElement.innerHTML = `${Math.round(temp)}`;
      degreeElement.innerHTML = `${degree}`;
    })
    .catch((error) => {
      console.error(error.message);
    });

  getForecast(lat, lon);
}

// api call for forecast
function getForecast(lat, lon) {
  // api call for current forecast per 3 hrs/ 5 days
  const ForecastCoordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;

  fetch(ForecastCoordUrl)
    .then((res) => res.json())
    .then((data) => {
      const citydata = data.city.name;
      locationElement.innerHTML = citydata;
      const windspeed = data.list[1].wind.speed;
      windElement.innerHTML = `${windspeed} m/s`;
      // Filter the forecast data to find rain forecasts
      const rainForecasts = data.list.filter(
        (item) => item.rain && item.rain["3h"]
      );
      console.log("Rain forecasts:", rainForecasts);

      // Display the first rain forecast's data
      if (rainForecasts.length > 0) {
        const firstRain = rainForecasts[0];
        rainElement.innerHTML = `${firstRain.rain["3h"]} mm`;
      } else {
        rainElement.innerHTML = "0.01 mm";
      }

      const dataList = data.list;

      createCardElement(dataList);
    })

    .catch((error) => {
      console.error(error.message);
    });
}

function createCardElement(dataList) {
  const cardContainerElement =
    document.getElementsByClassName("card-container")[0];

  dataList.forEach((item) => {
    const cardItemElement = document.createElement("div");
    cardItemElement.classList.add("card-item");

    const temp = item.main.temp;
    const degree = "&deg;C";
    const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const date = new Date(item.dt * 1000).toLocaleDateString("vi-Vn", {
      day: "numeric",
      month: "numeric",
    });

    let icon = item.weather[0].icon;
    let des = item.weather[0].description;
    let IconSrc;

    switch (icon) {
      case "01d":
        IconSrc = "assets/01d.png";
        break;
      case "01n":
        IconSrc = "assets/01n.png";
        break;
      case "02d":
        IconSrc = "assets/02d.png";
        break;
      case "02n":
        IconSrc = "assets/02n.png";
        break;
      case "03d":
        IconSrc = "assets/03d.png";
        break;
      case "03n":
        IconSrc = "assets/03n.png";
        break;
      case "04d":
        IconSrc = "assets/04d.png";
        break;
      case "04n":
        IconSrc = "assets/04n.png";
        break;
      case "09d":
        IconSrc = "assets/09d.png";
        break;
      case "09n":
        IconSrc = "assets/09n.png";
        break;
      case "10d":
        IconSrc = "assets/10d.png";
        break;
      case "10n":
        IconSrc = "assets/10n.png";
        break;
      case "11d":
        IconSrc = "assets/11d.png";
        break;
      case "11n":
        IconSrc = "assets/11n.png";
        break;
      case "13d":
        IconSrc = "assets/13d.png";
        break;
      case "13n":
        IconSrc = "assets/13n.png";
        break;
      case "50d":
        IconSrc = "assets/50d.png";
        break;
      case "50n":
        IconSrc = "assets/50n.png";
        break;
    }

    cardItemElement.innerHTML = `
        <p>${Math.round(temp)}${degree}</p>
        <div class="icon">
          <img src="${IconSrc}" alt="${des}">
        </div>
        <p class="date">${date}</p>
        <p class="time">${time}</p>
        `;
    cardContainerElement.appendChild(cardItemElement);
  });
}

let currentPage = 0;

function nextPage() {
  const cardContainer = document.getElementsByClassName("card-container")[0];
  const cardWidth = 425;
  const cardsPerPage = 2;
  const maxPages = Math.ceil(cardContainer.children.length / cardsPerPage);

  if (currentPage < maxPages - 1) {
    currentPage++;
    cardContainer.style.transform = `translateX(-${currentPage * cardWidth}px)`;
  }
}

function prevPage() {
  const cardContainer = document.getElementsByClassName("card-container")[0];
  const cardWidth = 425;

  if (currentPage > 0) {
    currentPage--;
    cardContainer.style.transform = `translateX(-${currentPage * cardWidth}px)`;
  }
}

switch (d) {
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

// update clock by realtime
function updateClock() {
  let today = new Date();
  let hours = today.getHours();
  let min = today.getMinutes();
  // add leading zero to minutes if less than 10
  if (min < 10) {
    min = "0" + min;
  }
  setTimeout(updateClock, 1000);
  weekdayElement.innerHTML = `${DayofWeek} | ${hours}:${min}`;
}

updateClock();

function error() {
  getWeather();
}

getLocation();