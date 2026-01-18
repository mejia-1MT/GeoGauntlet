import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "../utilities/Shake.css";
import Menu from "./Menu";

import PlayIcon from "../assets/play-circle-02-stroke-rounded";

const Home = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <div className="home">
      <h1 className="title">GeoGaunlet</h1>

      <p className="description">
        Test your geography knowledge on the following categories! 🌍
      </p>

      <div className="play-container shake-text">
        <div className="play-icon-wrapper">
          <PlayIcon className="play-icon" />
        </div>
        <h2 className="play " onClick={() => setOpenMenu(!openMenu)}>
          Play
        </h2>
      </div>

      <Menu openMenu={openMenu} closeMenu={closeMenu} />

      <div className="advisory">
        <p className="version">GeoGaunlet v2.0</p>
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
        <p className="copyright">© Meji </p>
      </div>
    </div>
  );
};

export default Home;
