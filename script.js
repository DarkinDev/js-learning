const API_key = "806c10017721c07fa7a1f6804f00d0b9";
const inputElement = document.getElementById("search");
const locationElement = document.getElementsByClassName("location")[0];
const tempElement = document.getElementsByClassName("temperature")[0];
const degreeElement = document.getElementsByClassName("degree")[0];
const dateElement = document.getElementsByClassName("date")[0];
const weekdayElement = document.getElementsByClassName("weekday-n-time")[0];
const windElement = document.getElementsByClassName("windData")[0];
const rainElement = document.getElementsByClassName("rainData")[0];
const cardContainerElement =
  document.getElementsByClassName("card-container")[0];

let currentPage = 0;

// Initialize the app
function init() {
  setDate();
  updateClock();
  getLocation();
}

// Set the current date
function setDate() {
  const today = new Date();
  const options = { year: "numeric", day: "numeric", month: "long" };
  dateElement.innerHTML = today.toLocaleDateString("en-US", options);
}

// Update the clock in real-time
function updateClock() {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const dayOfWeek = getDayOfWeek(today.getDay());
  weekdayElement.innerHTML = `${dayOfWeek} | ${hours}:${minutes}`;
  setTimeout(updateClock, 1000);
}

// Get the day of the week
function getDayOfWeek(dayIndex) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}

// Fetch weather data for a city
function fetchWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_key}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then(updateCurrentWeather)
    .catch(handleError);

  fetch(forecastUrl)
    .then((response) => response.json())
    .then(updateForecast)
    .catch(handleError);
}

// Update current weather data
function updateCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  tempElement.innerHTML = temp;
  degreeElement.innerHTML = "&deg;C";
}

// Update forecast data
function updateForecast(data) {
  locationElement.innerHTML = data.city.name;
  windElement.innerHTML = `${data.list[1].wind.speed} m/s`;

  const rainForecasts = data.list.filter(
    (item) => item.rain && item.rain["3h"]
  );
  rainElement.innerHTML =
    rainForecasts.length > 0 ? `${rainForecasts[0].rain["3h"]} mm` : "0.01 mm";

  replaceCardItems(data.list);
}

// Replace card items for forecast
function replaceCardItems(dataList) {
  cardContainerElement.innerHTML = ""; // Clear existing cards
  dataList.forEach((item) => {
    const cardItemElement = createCardItem(item);
    cardContainerElement.appendChild(cardItemElement);
  });
}

// Create a card item for forecast
function createCardItem(item) {
  const cardItemElement = document.createElement("div");
  cardItemElement.classList.add("card-item");

  const temp = Math.round(item.main.temp);
  const degree = "&deg;C";
  const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const date = new Date(item.dt * 1000).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "numeric",
  });

  const icon = iconReplace(item.weather[0].icon);
  const description = item.weather[0].description;

  cardItemElement.innerHTML = `
    <p>${temp}${degree}</p>
    <div class="icon">
      <img src="${icon}" alt="${description}">
    </div>
    <p class="date">${date}</p>
    <p class="time">${time}</p>
  `;

  return cardItemElement;
}

// Replace weather icon
function iconReplace(icon) {
  return `assets/${icon}.png`;
}

// Trigger search on Enter key press
inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    citySearch();
  }
});

// Handle search functionality
function citySearch() {
  const cityName = inputElement.value.trim();
  if (!cityName) {
    alert("Please type a city.");
    return;
  }
  fetchWeather(cityName);
  resetInput();
}

// Reset input field
function resetInput() {
  inputElement.value = "";
}

// Get user's current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchLocationWeather, handleError);
  } else {
    alert("Geolocation is not supported by this browser.");
    fetchWeather("Moscow"); // Default city
  }
}

// Fetch weather data for user's location
function fetchLocationWeather(position) {
  const { latitude, longitude } = position.coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then(updateCurrentWeather)
    .catch(handleError);

  fetch(forecastUrl)
    .then((response) => response.json())
    .then(updateForecast)
    .catch(handleError);
}

// Handle errors
function handleError(error) {
  console.error("Error:", error.message);
}

// Pagination for forecast cards
function nextPage() {
  const cardWidth = 425;
  const cardsPerPage = 2;
  const maxPages = Math.ceil(
    cardContainerElement.children.length / cardsPerPage
  );

  if (currentPage < maxPages - 1) {
    currentPage++;
    cardContainerElement.style.transform = `translateX(-${
      currentPage * cardWidth
    }px)`;
  }
}

function prevPage() {
  const cardWidth = 425;

  if (currentPage > 0) {
    currentPage--;
    cardContainerElement.style.transform = `translateX(-${
      currentPage * cardWidth
    }px)`;
  }
}

init();
