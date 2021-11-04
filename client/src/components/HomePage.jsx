import React from "react";
import Logo from "./pic/logo.png";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="image">
      <img src={Logo} alt="Logo" />
      <NavLink to={"/login"}>
        <div className="welcome">
          <h2>
            <span>Welcome</span>
          </h2>
        </div>
      </NavLink>
    </div>
  );
}

export default HomePage;
