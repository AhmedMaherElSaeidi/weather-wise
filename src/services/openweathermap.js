import axios from "axios";

const API_KEY = "5a1b29dac74a692110d44806f4451917";
const API = `https://api.openweathermap.org/data/2.5/forecast`;

// Fetching data based on coordinates
export const fetchWeatherCoords = async (lat, lon) => {
  return await axios.get(API, {
    params: { appid: API_KEY, lat, lon, units: "metric" },
  });
};

// Fetching data based on city
export const fetchWeatherCity = async (city) => {
  return await axios.get(API, {
    params: { appid: API_KEY, q: city, units: "metric" },
  });
};