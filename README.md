<h1 align="center"> ☁️ Weatherground ☁️</h1>
<div align="center">
  
  ![Badge](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)<br>

  ![Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
  ![Badge](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)  
</div>

<h1 align="center"> ☁️ How it works? ☁️</h1>
<p> - This project focuses on developing a responsive landing page where the user has a different visual experience at three different times and periods of the day.</p>

<h1 align="center"> ☁️ What was used? ☁️</h1>

[API Open Weather](https://api.openweathermap.org)
<br>
[Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
  
<h1 align="center"> ☁️ How to use? ☁️</h1>
<p> - To use, just activate location usage in your browser. This makes it possible for the API to fetch data about where you live from their database and display the information.</p>
<br>

<h1 align="center"> ☁️ Explanations. ☁️</h1>

## Starting the project
Let's start with the main step: cloning the project.

To clone this repo, you will need git installed on your computer. After that, just run the command
```bash
git clone https://github.com/MatheusSouza70/Weatherground.git
```

You will need to create an account on OpenWeather, you can create on [OpenWeather](https://openweathermap.org/api)
<p>after that, create an API key and copy that.</p>

On the code, access [script.js](https://github.com/MatheusSouza70/Weatherground/blob/main/js/script.js) and edit the line:
```javascript
const apiKey = "APIKEY";
```
with your API key generated on the OpenWeather site.

## Functions

### 1. updateBackgroundImage()
This function dynamically updates the background image of the webpage based on the current time of day. It sets different background images for morning, afternoon, and night. The background image changes to provide a visual representation of the time of day.

```javascript
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

  // Apply the selected background image to the body
  document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
}
```

### 2. updateCardBorders()
This function modifies the border colors of the cards displayed on the webpage based on the current time of day. It changes the border colors to blue in the morning, orange in the afternoon, and dark blue at night. The card borders help visually distinguish different sections of the webpage depending on the time.

```javascript
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
```
### 3. fetchWeatherData(latitude, longitude)
This function fetches weather data from the OpenWeatherMap API based on the user's geographical coordinates (latitude and longitude). It constructs the API URL with the provided coordinates, sends a request to the API, and updates the webpage with the received weather information, including weather description, temperature, city name, and weather icon.

```javascript
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
      // Extract weather information from the API response
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const cityName = data.name;
      const weatherIcon = data.weather[0].icon;
      const weatherInfo = `Clima: ${weatherDescription}<br>Temperatura: ${temperature}°C`;
      const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

      // Update weather information on the webpage
      document.getElementById("weather-info").innerHTML = weatherInfo;
      document.getElementById("city").textContent = `Cidade: ${cityName}`;
      document.getElementById("weather-icon").src = weatherIconUrl;
    })
    .catch((error) => {
      // Handle errors when fetching weather data
      console.error("Error fetching weather data:", error);
      document.getElementById("weather-info").textContent =
        "Weather data not available";
      document.getElementById("city").textContent = "City name not available";
      document.getElementById("weather-icon").src = "";
    });
}
```

### 4. updateTime()
This function updates the current time displayed on the webpage. It retrieves the current local time and formats it as a string, displaying it in the designated element on the webpage. The displayed time is updated in real-time, reflecting the actual local time.

```javascript
function updateTime() {
  const currentTime = new Date().toLocaleTimeString();
  document.getElementById(
    "current-time"
  ).textContent = `Horário: ${currentTime}`;
}
```

### 5. updatePageData()
This function serves as the main function to update all dynamic content on the webpage. It calls the following functions in sequence: updateBackgroundImage(), fetchWeatherData(), updateTime(), and updateCardBorders(). By executing these functions, the webpage's background image, weather information, current time, and card borders are all dynamically updated based on the user's local time and location.

```javascript
 // Update background image based on the time of day
  updateBackgroundImage();

  // Get current geolocation and fetch weather data
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetchWeatherData(latitude, longitude);
  });
```

### 6. setInterval(callback, interval)
The setInterval() method is a JavaScript function that repeatedly calls a specified function (callback) at a specified time interval (interval in milliseconds). In this application, updatePageData() function is passed as the callback, and it is called every 1000 milliseconds (1 second). This periodic update ensures that the weather information, background image, time, and card borders are continuously refreshed in real-time, providing users with up-to-date information.

```javascript
setInterval(updatePageData, 1000);
```

<h1 align="center"> ☁️ How does it looks?. ☁️</h1>

Morning
![](https://cdn.discordapp.com/attachments/704805407906070581/1168593138160500798/image.png?ex=6552542b&is=653fdf2b&hm=3964cd0b25759eb694e375f975238a22bb918a83a2e9ade73ffeea60bd732b62&)

Afternoon
![](https://cdn.discordapp.com/attachments/704805407906070581/1168593467887337582/image.png?ex=6552547a&is=653fdf7a&hm=9369cc7034149dac2d74e70f01c00b0b89632df2f189db300ab3e73a9910ac0c&)

Night
![](https://cdn.discordapp.com/attachments/704805407906070581/1168593676600086628/image.png?ex=655254ab&is=653fdfab&hm=f6a3bcb993093a77c2c1026164f41df8f6ec5be96b8aa45574b526a0e2491b9c&)
