//Function Day and Tima
function changeDayTime(current) {
  let dayTime = document.querySelector("#current-date");
  if (minute < 10) {
    dayTime.innerHTML = `${day}, ${hour}:0${minute}`;
  } else {
    dayTime.innerHTML = `${day}, ${hour}:${minute}`;
  }
}

//Function Change Forecast Days
function changeFirstDay(currentDay) {
  let firstDayElement = document.querySelector("#first-day");
  firstDayElement = `${firstDay}`;
}
function changeSecondDay(currentDay) {
  let secondDayElement = document.querySelector("#second-day");
  secondDayElement = `${secondDay}`;
}
function changeThirdDay(currentDay) {
  let thirdDayElement = document.querySelector("#third-day");
  thirdDayElement = `${thirdDay}`;
}
function changeFourthDay(currentDay) {
  let fourthDayElement = document.querySelector("#fourth-day");
  fourthDayElement = `${fourthDay}`;
}
function changeFifthDay(currentDay) {
  let fifthDayElement = document.querySelector("#fifth-day");
  fifthDayElement = `${fifthDay}`;
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

//Function Change Celsius
function changeCelsiusScale(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  celsius.classList.add("active");
  farenheit.classList.remove("active");
  currentDegree.innerHTML = Math.round(celsiusTemperature);
}

// Function Change Farenheit
function changeFarenheitScale(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  celsius.classList.remove("active");
  farenheit.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  currentDegree.innerHTML = Math.round(fahrenheiTemperature);
}

// Function Show Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#current-degree");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity-level");
  celsius.classList.add("active");
  cityName.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let backgroundElement = document.querySelector("#background-image");

  if (response.data.weather[0].main === "Clear") {
    backgroundElement.setAttribute("src", `images/clear.jpg`);
  } else if (response.data.weather[0].main === "Clouds") {
    backgroundElement.setAttribute("src", `images/clouds.jpg`);
  } else if (response.data.weather[0].main === "Drizzle") {
    backgroundElement.setAttribute("src", `images/drizzle.jpg`);
  } else if (response.data.weather[0].main === "Fog") {
    backgroundElement.setAttribute("src", `images/fog.jpg`);
  } else if (response.data.weather[0].main === "Mist") {
    backgroundElement.setAttribute("src", `images/mist.jpg`);
  } else if (response.data.weather[0].main === "Rain") {
    backgroundElement.setAttribute("src", `images/rain.jpg`);
  } else if (response.data.weather[0].main === "Snow") {
    backgroundElement.setAttribute("src", `images/snow.jpg`);
  } else if (response.data.weather[0].main === "Thunderstorm") {
    backgroundElement.setAttribute("src", `images/thunderstorm.jpg`);
  }
}

// Function Get Position
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

// Function Change City Name after Searcg
function changeCity(response) {
  response.preventDefault();
  let citySearch = document.querySelector("#site-search");
  let city = citySearch.value;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showSearchTemperature);
}

// Function Search Temperature
function showSearchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  let currentTemperature = document.querySelector("#current-degree");
  let descriptionElement = document.querySelector("#weather-description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity-level");
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = `${response.data.name}`;
  currentTemperature.innerHTML = `${temperature}`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  celsius.classList.add("active");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let backgroundElement = document.querySelector("#background-image");

  if (response.data.weather[0].main === "Clear") {
    backgroundElement.setAttribute("src", `images/clear.jpg`);
  } else if (response.data.weather[0].main === "Clouds") {
    backgroundElement.setAttribute("src", `images/clouds.jpg`);
  } else if (response.data.weather[0].main === "Drizzle") {
    backgroundElement.setAttribute("src", `images/drizzle.jpg`);
  } else if (response.data.weather[0].main === "Fog") {
    backgroundElement.setAttribute("src", `images/fog.jpg`);
  } else if (response.data.weather[0].main === "Mist") {
    backgroundElement.setAttribute("src", `images/mist.jpg`);
  } else if (response.data.weather[0].main === "Rain") {
    backgroundElement.setAttribute("src", `images/rain.jpg`);
  } else if (response.data.weather[0].main === "Snow") {
    backgroundElement.setAttribute("src", `images/snow.jpg`);
  } else if (response.data.weather[0].main === "Thunderstorm") {
    backgroundElement.setAttribute("src", `images/thunderstorm.jpg`);
  }
}

// Function Call Current Temperature based on Geolocation
function showCurrentWeather(position) {
  position.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius");
let farenheit = document.querySelector("#farenheit");
celsius.addEventListener("click", changeCelsiusScale);
farenheit.addEventListener("click", changeFarenheitScale);

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentWeather);
