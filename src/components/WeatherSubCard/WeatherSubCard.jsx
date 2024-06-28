import "./WeatherSubCard.css";
import React from "react";

const WeatherSubCard = ({
  temp,
  lowtemp,
  hightemp,
  forecastDayIcon,
  forecastNightIcon,
  day,
}) => {
  return (
    <div className="col-md-3 col-sm-6 day-weather-box">
      <div className="col-sm-12 day-weather-inner-box">
        <div className="col-sm-8 forecast-main">
          <h6>{day}</h6>
          <p>{temp}°</p>
        </div>
        <div className="col-sm-4 forecast-temp">
          <p>
            {forecastDayIcon} {hightemp}
          </p>
          <p>
            {forecastNightIcon} {lowtemp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherSubCard;
