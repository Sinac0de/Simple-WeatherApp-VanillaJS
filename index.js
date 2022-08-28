const searchInput = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const cityDOM = document.querySelector(".city");
const tempDOM = document.querySelector(".temp");
const windDOM = document.querySelector(".wind");
const descriptionDOM = document.querySelector(".description");
const humidityDOM = document.querySelector(".humidity");
const weatherIconDOM = document.querySelector(".weather-icon");
let pageDirection = document.documentElement.dir;
let pageLang = document.documentElement.lang;
let cityName = "";


//set default weather info
document.addEventListener("DOMContentLoaded", () => weather.fetchWeatherLtr("Tehran"));

let weather = {
    apiKey: "673885386a9f5cdfefe931042c4d1129",
    fetchWeatherLtr: (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=metric&lang=en`)
            .then(response => response.json())
            .then(data => weather.displayWeatherLtr(data, pageDirection))
            .catch(() => {
                alert("The entered city was not found!");
                searchInput.value = "";
            });
    },
    displayWeatherLtr: (data) => {
        const city = data.name;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        cityName = data.name;//for changing lang
        cityDOM.innerText = `Weather in ${city}`;
        tempDOM.innerText = `${temp}°C`;
        weatherIconDOM.src = `https://openweathermap.org/img/wn/${icon}.png`;
        descriptionDOM.innerText = description;
        humidityDOM.innerText = `Humidity: ${humidity}%`;
        windDOM.innerText = `Wind speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
    },

    fetchWeatherRtl: (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.apiKey}&units=metric&lang=fa`)
            .then(response => response.json())
            .then(data => weather.displayWeatherRtl(data, pageDirection))
            .catch((err) => {
                console.log(err);
                alert("شهر مورد نظر یافت نشد!");
                searchInput.value = "";
            });
    },
    displayWeatherRtl: (data) => {
        const city = data.name;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;
        cityName = data.name;//for changing lang
        cityDOM.innerText = `وضعیت آب و هوا در ${city}`;
        tempDOM.innerText = `${temp}° سلسیوس`;
        weatherIconDOM.src = `https://openweathermap.org/img/wn/${icon}.png`;
        descriptionDOM.innerText = description;
        humidityDOM.innerText = `رطوبت: %${humidity}`;
        windDOM.innerText = `سرعت باد: ${speed} کیلومتر بر ساعت`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
    },

    search: () => {
        if (searchInput.value != null) {
            console.log(pageDirection)
            if (pageDirection == "ltr") {
                weather.fetchWeatherLtr(searchInput.value.trim());
            } else if (pageDirection == "rtl") {
                weather.fetchWeatherRtl(searchInput.value.trim());
            }
        } else if (searchInput.value == null && pageDirection == "ltr") {
            alert("Please enter a city name!");
        } else if (searchInput.value == null && pageDirection == "rtl") {
            alert("لطفا نام یک شهر را وارد کنید!");
        }
    }
}

//search button
searchBtn.addEventListener("click", weather.search);

//ENTER key press
searchInput.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        weather.search(searchInput.value);
    }
})


/*--------change page language---------*/
const changeLangBtn = document.querySelector(".change-lang-btn");

changeLangBtn.addEventListener("click", () => {
    if (pageLang == "en") {
        document.documentElement.lang = "fa";
        document.documentElement.dir = "rtl";
        pageLang = "fa";
        pageDirection = "rtl";
        weather.fetchWeatherRtl(cityName);
        searchInput.placeholder = "جستجوی شهر";
    } else if (pageLang == "fa") {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        pageLang = "en";
        pageDirection = "ltr";
        weather.fetchWeatherLtr(cityName);
        searchInput.placeholder = "Search for city";
    }
});