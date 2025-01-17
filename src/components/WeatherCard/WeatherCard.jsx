import "./WeatherCard.css";
import { globalContext } from "../../App";
import React, { useEffect, useState } from "react";
import ErrModal from "../ErrModal/ErrModal";
import { HiOutlineRefresh } from "react-icons/hi";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import WeatherSubCard from "../WeatherSubCard/WeatherSubCard";
import WeatherOffline from "../WeatherOffline/WeatherOffline";
import {
  fetchWeatherCity,
  fetchWeatherCoords,
} from "../../services/openweathermap";
import getCurrLocation from "../../services/GeoLocation";
import WeatherForecast from "../../models/WeatherForecast";

const WeatherCard = () => {
  const [weatherMetric, setWeatherMetric] = useState("celsius");
  const { location, setLocation } = globalContext();
  const [weatherData, setWeatherData] = useState({
    err: null,
    data: null,
    forecast: null,
  });

  const fetchWeatherData = async () => {
    try {
      let weather_response = null;

      if (typeof location !== "string") {
        weather_response = await fetchWeatherCoords(location.lat, location.lon);
      } else {
        weather_response = await fetchWeatherCity(location);
      }

      // Processing weather data to add to forecast
      const weather = new WeatherForecast();
      weather_response.data.list.forEach((entry) => {
        weather.addDayForecast(
          entry.dt,
          entry.dt_txt,
          entry.weather[0].icon,
          entry.main.temp,
          entry.main.temp_min,
          entry.main.temp_max
        );
      });

      // Retrieve the entire forecast
      const forecastData = weather.getForecast();
      setWeatherData({
        ...weatherData,
        data: weather_response.data,
        forecast: forecastData,
      });
    } catch (error) {
      console.log(error);
      setWeatherData({
        ...weatherData,
        err: error.response ? error.response.data.message : error.message,
      });
    }
  };
  const getNowLocation = async () => {
    try {
      const coords = await getCurrLocation();
      setLocation(coords);
    } catch (errorMessage) {
      console.log(errorMessage);
    }
  };
  const getWeatherTemp = (celsiustemp) => {
    if (weatherMetric === "fahrenheit") {
      return Math.round((celsiustemp * 9) / 5 + 32);
    }
    return Math.round(celsiustemp);
  };
  const unixtoDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const unixtoTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getNowLocation();
      fetchWeatherData();
    };

    fetchData();
  }, []);
  
  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 60000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="container weather-card p-1">
      {weatherData.data && (
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-md-4 col-sm-5 mb-5">
              <h5>
                <span>{weatherData.data.city.name}</span>,
                <span> {weatherData.data.city.country}</span>
              </h5>
              <h6>{unixtoDate(weatherData.data.list[0].dt)}</h6>
              <a className="fw-bold" onClick={() => getNowLocation()}>
                <HiOutlineRefresh /> Reset
              </a>
            </div>

            <div className="col-md-5 col-sm-7 m-auto p-0 mb-5">
              <div className="weather-body-center">
                <WeatherIcon
                  conditionCode={weatherData.data.list[0].weather[0].icon}
                />
                <div>
                  <span id="mainTemperature">
                    {getWeatherTemp(weatherData.data.list[0].main.temp)}
                  </span>
                  <p id="tempDescription">
                    {weatherData.data.list[0].weather[0].description}
                  </p>
                </div>
                <p
                  onClick={() =>
                    setWeatherMetric(
                      weatherMetric === "fahrenheit" ? "celsius" : "fahrenheit"
                    )
                  }
                >
                  <a
                    href="#"
                    className={
                      weatherMetric === "celsius" ? "active p-1" : "p-1"
                    }
                  >
                    °C
                  </a>
                  |
                  <a
                    href="#"
                    className={
                      weatherMetric === "fahrenheit" ? "active p-1" : "p-1"
                    }
                  >
                    °F
                  </a>
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-3 row">
              <div className="weather-body-right">
                <h6>
                  High: {getWeatherTemp(weatherData.data.list[0].main.temp_max)}
                  °
                </h6>
                <h6>
                  Low: {getWeatherTemp(weatherData.data.list[0].main.temp_min)}°
                </h6>
                <h6>Humidity: {weatherData.data.list[0].main.humidity}%</h6>
                <h6>Wind: {weatherData.data.list[0].wind.speed} m/s</h6>
              </div>
            </div>
          </div>
        </div>
      )}
      {weatherData.forecast && (
        <div className="container-fluid">
          <div className="row justify-content-center">
            {weatherData.forecast
              .filter(
                (_, index) =>
                  index !== 0 && index !== weatherData.forecast.length - 1
              )
              .map((entry, index) => {
                return (
                  <WeatherSubCard
                    key={index}
                    temp={getWeatherTemp(
                      WeatherForecast.getAVGTemperature(entry.temperatures)
                    )}
                    hightemp={getWeatherTemp(entry.maxTemperature)}
                    lowtemp={getWeatherTemp(entry.minTemperature)}
                    day={unixtoDate(entry.dt).slice(0, 3)}
                    forecastDayIcon={
                      entry.dayIcon && (
                        <WeatherIcon conditionCode={entry.dayIcon} />
                      )
                    }
                    forecastNightIcon={
                      entry.nightIcon && (
                        <WeatherIcon conditionCode={entry.nightIcon} />
                      )
                    }
                  />
                );
              })}
          </div>
        </div>
      )}
      {weatherData.err && (
        <ErrModal
          text={weatherData.err}
          closeModal={() => setWeatherData({ ...weatherData, err: null })}
        />
      )}
      {!weatherData.data && <WeatherOffline />}
    </div>
  );
};

export default WeatherCard;
