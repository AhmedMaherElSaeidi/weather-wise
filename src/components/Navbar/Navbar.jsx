import "./Navbar.css";
import { globalContext } from "../../App";
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import { FaBarsStaggered } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import navico from "../../assets/images/667d2c500bc3dcc782e652ef.png";
import Spinner from "../Spinner/Spinner";

const Navbar = () => {
  const [inputState, setInputState] = useState({ value: "", typing: false });
  const { setLocation } = globalContext();
  const handleInputState = (event) => {
    const { value } = event.target;
    setInputState({ ...inputState, value, typing: value && true });
  };

  useEffect(() => {
    let timeoutId;

    if (inputState.typing && inputState.value) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setLocation(inputState.value);
        setInputState({ ...inputState, typing: false });
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [inputState.value, inputState.typing]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={navico} alt="navbarico" /> Weather Wise
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBarsStaggered />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <input
                className="form-control"
                type="search"
                value={inputState.value}
                onChange={handleInputState}
                placeholder="City"
                aria-label="Search"
              />
            </li>
            {inputState.typing && (
              <li className="nav-item">
                <Spinner />
              </li>
            )}
            <li className="nav-item">
              <ThemeBtn />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
