let weather, temp, city, icon;

async function getWeather() {
  const city_name = "Saigon";
  const API_key = "806c10017721c07fa7a1f6804f00d0b9";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&lang=vi&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  weather = data.weather[0].description;
  temp = data.main.temp;
  city = data.name;
  icon = data.weather[0].icon;

  const weatherElement = document.getElementById("weather");
  const temperatureElement = document.getElementById("temperature");
  const locationElement = document.getElementById("location");
  const weatherIconElement = document.getElementById("weather-icon");

  locationElement.innerHTML = city;
  temperatureElement.innerHTML = `${temp} &#176C`;
  weatherElement.innerHTML = weather;
  weatherIconElement.src = `https://openweathermap.org/img/wn/10d@2x.png`;
  console.log(data);
}

getWeather();
