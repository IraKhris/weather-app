//Function Day and Time
function changeDayTime(current) {
  let dayTime = document.querySelector("#current-date");

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

  if (minute < 10) {
    dayTime.innerHTML = `Last updated: ${day}, ${hour}:0${minute}`;
  } else {
    dayTime.innerHTML = `Last updated: ${day}, ${hour}:${minute}`;
  }
}

// Funciton return day names
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Function displays forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast row justify-content-md-center">
            <div class="card border-info mb-1 weekday-block">
              <div class="card-header weekday" id="first-day">${formatDay(
                forecastDay.dt
              )}</div>
              <div class="card-body text-info">
                <h5 class="card-title weekday-temperature"><span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° <span>|<span>
                </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span></h5>
                <p class="card-text"><img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></p>
              </div>
            </div> 
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Function getForecast
function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Function change background image
function changeBackground(conditions) {
  let backgroundElement = document.querySelector("#background-image");

  if (conditions === "Clear") {
    backgroundElement.setAttribute("src", `images/clear.jpg`);
  } else if (conditions === "Clouds") {
    backgroundElement.setAttribute("src", `images/clouds.jpg`);
  } else if (conditions === "Drizzle") {
    backgroundElement.setAttribute("src", `images/drizzle.jpg`);
  } else if (conditions === "Fog") {
    backgroundElement.setAttribute("src", `images/fog.jpg`);
  } else if (conditions === "Mist") {
    backgroundElement.setAttribute("src", `images/mist.jpg`);
  } else if (conditions === "Rain") {
    backgroundElement.setAttribute("src", `images/rain.jpg`);
  } else if (conditions === "Snow") {
    backgroundElement.setAttribute("src", `images/snow.jpg`);
  } else if (conditions === "Thunderstorm") {
    backgroundElement.setAttribute("src", `images/thunderstorm.jpg`);
  }
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

  getForecast(response.data.coord);

  let conditions = response.data.weather[0].main;
  changeBackground(conditions);
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

// Function Change City Name after Search
function changeCity(response) {
  response.preventDefault();
  let citySearch = document.querySelector("#site-search");
  let city = citySearch.value;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

// Function Call Current Temperature based on Geolocation
function showCurrentWeather(position) {
  position.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentDate = document.querySelector("#current-date");
changeDayTime(currentDate);

navigator.geolocation.getCurrentPosition(showPosition);

let searchCity = document.querySelector("#search");
searchCity.addEventListener("submit", changeCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentWeather);
