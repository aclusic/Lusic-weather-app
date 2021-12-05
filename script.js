//show the current date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let timeShown = `${currentDay} ${currentHour}:${currentMinutes}`;
  return timeShown;
}

let currentTimeSlot = document.querySelector("#time-slot");
let myCurrentTime = new Date();
currentTimeSlot.innerHTML = formatDate(myCurrentTime);

//show temp of searched city

function showMyWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".current-temp-actual");
  let weatherType = response.data.weather[0].main;
  let weatherTypePlaceholder = document.querySelector(".weather-type");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let feelsLikeTempPlaceholder = document.querySelector(".feels-like-temp");

  let currentCity = document.querySelector("#city");

  currentCity.innerHTML = `${response.data.name}`;

  temp.innerHTML = temperature;
  weatherTypePlaceholder.innerHTML = weatherType;
  feelsLikeTempPlaceholder.innerHTML = feelsLikeTemp;
}

function showTemp(cityName) {
  console.log(cityName);
  let unit = "imperial";
  let apiKey = "1d6d56efd8f9421b84939b7a2074f3af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;
  //console.log(apiUrl);

  axios.get(apiUrl).then(showMyWeather);
}

//change city name shown when user searches new city
function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-text-input");
  showTemp(searchedCity.value);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

//get current city temp
function showPosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "1d6d56efd8f9421b84939b7a2074f3af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&units=${unit}&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showMyWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentCityform = document.querySelector("#currentCityButton");
currentCityform.addEventListener("click", getCurrentPosition);

//change the temp to Farhenheit when clicking the C button
function showFarhenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".current-temp-actual");
  temp.innerHTML = "65";
}

let fahrenheit = document.querySelector("#far-link");
fahrenheit.addEventListener("click", showFarhenheit);

//change the temp to Celsius when clicking the C button
function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".current-temp-actual");
  temp.innerHTML = "40";
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);
