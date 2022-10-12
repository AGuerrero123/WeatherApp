function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function getforecast(coordinates){
  console.log(coordinates);
  let apiKey = `be60748992fab0f5da8162563fb21245`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}}&appid=${apiKey}&units=metric`
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response){
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
let days = ["Thu", "Fri", "Sat"];
days.forEach(function(day){
  forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="weather-forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/10n@2x.png" alt=""width="42">
    <div class="weather-forecast-temp">
      <span class="weather-forecast-temp-max">18°</span>
      <span class="weather-forecast-temp-min">12°</span>
    </div>
  </div>`;

})
forecastHTML = forecastHTML +  `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function displayWeatherConditions(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    document.querySelector("#icon").setAttribute(
      "src", `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`
    )
    document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    document.querySelector("#icon").setAttribute(
      "alt", response.data.weather[0].main
    )
getforecast(response.data.coord);
    
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = `be60748992fab0f5da8162563fb21245`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function searchLocation(position) {
  let apiKey = `be60748992fab0f5da8162563fb21245`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9/5) + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
 

let celsiusTemperature = null;

//Feature One
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Feature Two
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Feature Three
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//Feature Four
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Tokyo");
