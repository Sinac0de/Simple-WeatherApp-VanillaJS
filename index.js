const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const cityDOM = document.querySelector(".city");
const tempDOM = document.querySelector(".temp");
const windDOM = document.querySelector(".wind");
const descriptionDOM = document.querySelector(".description");
const humidityDOM = document.querySelector(".humidity");
const weatherIconDOM = document.querySelector(".weather-icon");

let weather = {
    apiKey: "673885386a9f5cdfefe931042c4d1129",
    fetchWeather: (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => weather.displayWeather(data));
    },
    displayWeather: (data) => {
        const city = data.name;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        cityDOM.innerText = `Weather in ${city}`;
        tempDOM.innerText = `${temp}°C`;
        weatherIconDOM.src = `https://openweathermap.org/img/wn/${icon}.png`;
        descriptionDOM.innerText = description;
        humidityDOM.innerText = `Humidity: ${humidity}%`;
        windDOM.innerText = `Wind speed: ${speed} km/h`;
    }
}


