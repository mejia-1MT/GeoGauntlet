import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "../utilities/Shake.css";
import Menu from "./Menu";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="home">
      <h1 className="geo">GeoGaunlet</h1>

      <p className="description">
        Test your geography knowledge on the following categories! 🌍
      </p>

      <div className="play-container">
        <h2 className="play" onClick={() => setOpenMenu(!openMenu)}>
          Play
        </h2>
      </div>

      <Menu openMenu={openMenu} />

      <div className="advisory">
        <p>GeoGaunlet v2.0</p>
        <p>||</p>
        <p>
          info used are from{" "}
          <a
            className="link"
            href="https://restcountries.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://restcountries.com
          </a>
        </p>
        <p>||</p>
        <p>© Meji </p>
      </div>
    </div>
  );
};

export default Home;
