const apiKey = "YOUR_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to update the background image based on the current time
function updateBackgroundImage() {
  const currentTime = new Date().getHours();
  let backgroundImageUrl;

  // Set background image based on the time of day: morning, afternoon, or night
  if (currentTime >= 6 && currentTime < 12) {
    backgroundImageUrl = "./img/morning.jpg";
  } else if (currentTime >= 12 && currentTime < 18) {
    backgroundImageUrl = "./img/afternoon.jpg";
  } else {
    backgroundImageUrl = "./img/night.jpg";
  }

  document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
}

// Function to update card borders based on the current time
function updateCardBorders() {
  const currentTime = new Date().getHours();
  const cards = document.querySelectorAll(".card");

  // Set card borders based on the time of day: morning, afternoon, or night
  if (currentTime >= 6 && currentTime < 12) {
    cards.forEach((card) => {
      card.style.border = "2px solid #7bc4e8"; // Blue for morning
    });
  } else if (currentTime >= 12 && currentTime < 18) {
    cards.forEach((card) => {
      card.style.border = "2px solid #ffb145"; // Orange for afternoon
    });
  } else {
    cards.forEach((card) => {
      card.style.border = "2px solid #024275"; // Dark blue for night
    });
  }
}

// Function to fetch weather data using latitude and longitude coordinates
function fetchWeatherData(latitude, longitude) {
  const apiUrlWithParams = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=pt`;

  // Fetch weather data from the OpenWeatherMap API
  fetch(apiUrlWithParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No response from server");
      }
      return response.json();
    })
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const cityName = data.name;
      const weatherIcon = data.weather[0].icon;
      const weatherInfo = `Clima: ${weatherDescription}<br>Temperatura: ${temperature}°C`;
      const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

      document.getElementById("weather-info").innerHTML = weatherInfo;
      document.getElementById("city").textContent = `Cidade: ${cityName}`;
      document.getElementById("weather-icon").src = weatherIconUrl;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      document.getElementById("weather-info").textContent =
        "Weather data not available";
      document.getElementById("city").textContent = "City name not available";
      document.getElementById("weather-icon").src = "";
    });
}

// Function to update the current time on the webpage
function updateTime() {
  const currentTime = new Date().toLocaleTimeString();
  document.getElementById(
    "current-time"
  ).textContent = `Horário: ${currentTime}`;
}

// Function to update all page data (background, weather, time, card borders)
function updatePageData() {
  // Update background image based on the time of day
  updateBackgroundImage();

  // Get current geolocation and fetch weather data
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherData(latitude, longitude);
  });

  // Update current time on the webpage
  updateTime();

  // Update card borders based on the time of day
  updateCardBorders();
}

// Initial call to update page data when the page loads
updatePageData();

// Periodically update page data every 1 second (1000 milliseconds)
setInterval(updatePageData, 1000);
