import Navbar from "./components/Navbar/Navbar";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();
export const globalContext = () => useContext(GlobalContext);

const Layout = () => {
  const [theme, setTheme] = useState("light");
  const [location, setLocation] = useState("giza");
  const themeToggeler = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <GlobalContext.Provider
      value={{ theme, location, themeToggeler, setLocation }}
    >
      <div id={theme}>
        <Navbar />
        <WeatherCard />
      </div>
    </GlobalContext.Provider>
  );
};

export default Layout;
