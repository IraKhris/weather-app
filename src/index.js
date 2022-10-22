//Feature #1
function changeDayTime(current) {
  let dayTime = document.querySelector("#current-date");
  if (minute < 10) {
    dayTime.innerHTML = `${day}, ${hour}:0${minute}`;
  } else {
    dayTime.innerHTML = `${day}, ${hour}:${minute}`;
  }
}

function changeFirstDay(currentDay) {
  let day = document.querySelector("#first-day");
  day.innerHTML = `${firstDay}`;
}
function changeSecondDay(currentDay) {
  let day = document.querySelector("#second-day");
  day.innerHTML = `${secondDay}`;
}
function changeThirdDay(currentDay) {
  let day = document.querySelector("#third-day");
  day.innerHTML = `${thirdDay}`;
}
function changeFourthDay(currentDay) {
  let day = document.querySelector("#fourth-day");
  day.innerHTML = `${fourthDay}`;
}
function changeFifthDay(currentDay) {
  let day = document.querySelector("#fifth-day");
  day.innerHTML = `${fifthDay}`;
}

let currentDate = document.querySelector("#current-date");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getUTCMinutes();

let nextDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let firstDay = nextDays[now.getDay() + 1];
let secondDay = nextDays[now.getDay() + 2];
let thirdDay = nextDays[now.getDay() + 3];
let fourthDay = nextDays[now.getDay() + 4];
let fifthDay = nextDays[now.getDay() + 5];
changeDayTime(currentDate);
changeFirstDay(firstDay);
changeSecondDay(secondDay);
changeThirdDay(thirdDay);
changeFourthDay(fourthDay);
changeFifthDay(fifthDay);

//Feature #3
function changeCelsiusScale(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = `19`;
}

function changeFarenheitScale(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  currentDegree.innerHTML = `66`;
}

let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheit");
celsius.addEventListener("click", changeCelsiusScale);
farenheit.addEventListener("click", changeFarenheitScale);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#current-degree");
  cityName.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

function changeCity(response) {
  response.preventDefault();
  let citySearch = document.querySelector("#site-search");
  let city = citySearch.value;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showSearchTemperature);
}

function showSearchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#current-degree");
  cityName.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentWeather);

function showCurrentWeather(position) {
  position.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
