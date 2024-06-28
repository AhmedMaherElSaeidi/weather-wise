import React from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayHail,
  WiNightHail,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

const WeatherIcon = ({ conditionCode }) => {
  const weatherIconsMap = {
    "01d": WiDaySunny,
    "01n": WiNightClear,
    "02d": WiDayCloudy,
    "02n": WiNightCloudy,
    "03d": WiCloud,
    "03n": WiCloud,
    "04d": WiCloudy,
    "04n": WiCloudy,
    "09d": WiShowers,
    "09n": WiShowers,
    "10d": WiDayHail,
    "10n": WiNightHail,
    "11d": WiThunderstorm,
    "11n": WiThunderstorm,
    "13d": WiSnow,
    "13n": WiSnow,
    "50d": WiFog,
    "50n": WiFog,
  };

  const getWeatherIcon = (conditionCode) => {
    const IconComponent = weatherIconsMap[conditionCode];
    return <IconComponent />;
  };

  return getWeatherIcon(conditionCode);
};

export default WeatherIcon;
