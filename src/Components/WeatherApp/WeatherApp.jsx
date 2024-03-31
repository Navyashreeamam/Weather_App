import React, { useState } from 'react';
import './WeatherStyle.css'; 

import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import clear_icon from '../Assets/clear.png';


const WeatherApp = () => {
  const api_key = "5f540ad38d9ecac07fc5ad9fc27b4643";

  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.main && data.main.humidity !== undefined) {
        const humidity = document.getElementsByClassName("humidity-percent");
        humidity[0].innerHTML = data.main.humidity + " %";

        const wind = document.getElementsByClassName("wind-rate");
        wind[0].innerHTML = Math.floor(data.wind.speed) + " Km/h";

        const temperature = document.getElementsByClassName("weather-temp");
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";

        const location = document.getElementsByClassName("weather-location");
        location[0].innerHTML = data.name;

        // Set weather icon based on weather condition
        const iconCode = data.weather[0].icon;
        let icon;
        switch (iconCode) {
          case "01d":
          case "01n":
            icon = clear_icon;
            break;
          case "02d":
          case "02n":
            icon = cloud_icon;
            break;
          case "03d":
          case "03n":
            icon = drizzle_icon;
            break;
          case "04d":
          case "04n":
            icon = drizzle_icon;
            break;
          case "09d":
          case "09n":
            icon = rain_icon;
            break;
          case "10d":
          case "10n":
            icon = rain_icon;
            break;
          case "13d":
          case "13n":
            icon = snow_icon;
            break;
          default:
            icon = cloud_icon;
        }

        setWeatherIcon(icon);
      } else {
        console.error("Humidity data not available");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt=''/>
        </div>
      </div>
      <div className='weather-image'>
        <img src={weatherIcon} alt=''/>
      </div>
      <div className='weather-temp'> 24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon'/>
          <div className='data'>
            <div className='wind-rate'>18 Km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;