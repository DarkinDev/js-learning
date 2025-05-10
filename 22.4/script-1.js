let data;
const API_key = "806c10017721c07fa7a1f6804f00d0b9";
let inputElement = document.getElementById("search-weather");
const weatherElement = document.getElementById("weather");
const temperatureElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");

// Ấn vô nút => trigger function citySearch -> Gọi API get Weather
// Lấy giá trị input đi search => http method (get, post, put, patch, delete, option) =>

function citySearch() {
  let value = inputElement.value;

  if (!value) {
    alert("Vui lòng nhập tên thành phố.");
    return;
  }

  const city_name = value;

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&lang=vi&units=metric`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      data = res;
    });

  reset(inputElement);
}

// Function show search result
function searchResult() {
  const weather = data.weather[0].description;
  const temp = data.main.temp;
  const city = data.name;

  locationElement.innerHTML = `Địa điểm: ${city}`;
  temperatureElement.innerHTML = `Nhiệt độ: ${temp} &#176;C`;
  weatherElement.innerHTML = `Thời tiết: ${weather}`;
}

// addEventListener(type, callback )

// setTimeout(callback, time - milisecond)

// Bắt event enter input của user => Dùng để gọi API tới openweather
inputElement.addEventListener("change", function (event) {
  console.log("Người dùng đang gõ:", event.target.value);
  let value = inputElement.value;
  const city_name = value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&lang=vi&units=metric`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
    });

  reset(inputElement);
});

function reset(inputElement) {
  inputElement.value = "";
}
