import "./WeatherOffline.css";
import React from "react";
import { IoCloudOffline } from "react-icons/io5";

const WeatherOffline = () => {
  return (
    <div className="weather-offline">
      <i>
        <IoCloudOffline />
      </i>
      <p>No Internet Connection</p>
    </div>
  );
};

export default WeatherOffline;
