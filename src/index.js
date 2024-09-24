function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  let formattedMonth = months[date.getMonth()];
  let formattedDate = `${formattedDay}, ${formattedMonth} ${date.getDate()}, ${date.getFullYear()}`;

  return `${formattedDate} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let weatherIconElement = document.querySelector("#weather-icon");
  let currentDateElement = document.querySelector("#current-date");

  // Updating the UI with API response data
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  weatherDescriptionElement.innerHTML = response.data.condition.description;

  // Set the weather icon
  weatherIconElement.setAttribute("src", response.data.condition.icon_url);
  weatherIconElement.setAttribute(
    "alt",
    `Weather icon for ${response.data.city}`
  );

  // Update current date and time
  let now = new Date();
  currentDateElement.innerHTML = formatDate(now);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433"; // Use your actual API key
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

// Event listener for form submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Display current date and time when page loads
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
