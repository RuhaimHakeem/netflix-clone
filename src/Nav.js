import React from "react";
import "./Nav.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => history.push("/")}
          className="nav__logo"
          src={require("./logo.png")}
          alt=""
        />
        <img
          onClick={() => history.push("/profile")}
          className="nav__avatar"
          src={require("./avatar.png")}
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
