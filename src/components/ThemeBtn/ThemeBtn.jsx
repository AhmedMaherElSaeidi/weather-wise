import "./ThemeBtn.css";
import React from "react";
import { globalContext } from "../../App";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeBtn = () => {
  const { theme, themeToggeler } = globalContext();

  return (
    <div className="theme-btn">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={themeToggeler}
        checked={theme === "dark"}
      />
      <label htmlFor="checkbox" className="checkbox-label">
        <i className="fa-sun">
          <FaSun />
        </i>
        <i className="fa-moon">
          <FaMoon />
        </i>
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeBtn;
