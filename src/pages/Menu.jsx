import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import "./Home.css";

import BackIcon from "../assets/arrow-left-01-stroke-rounded";

const Option = ({ openMenu, closeMenu }) => {
  const [countries, setCountries] = useState([]);
  const [hovered, setHovered] = useState(null);

  const footnote = {
    capital: "Guess the capital city of countries around the world.",
    flag: "Identify countries by their national flags.",
    population: "Compare and estimate country populations.",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,flags,capital,currencies"
        );
        const data = await response.json();

        const countryNames = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
          capital: country.capital,
          currency: country.currencies,
          population: country.population,
        }));

        setCountries(countryNames);
      } catch (error) {
        console.log("Fetching error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={`menu ${openMenu ? "menu-open" : "menu-closed"}`}>
      {/* background wipe animation */}
      <div className="wipe">
        <div className="panel p1" />
        <div className="panel p2" />
        <div className="panel p3" />
        <div className="panel p4" />
      </div>

      {/* Fullscreen backdrop */}
      <div
        className={`games-backdrop ${hovered ? `backdrop-${hovered}` : ""}`}
      ></div>

      {/* menu content */}
      <Link to="/" className="back" onClick={closeMenu}>
        <BackIcon />
      </Link>

      <div className="games">
        <Link
          to="/capital"
          className="game title shake-text"
          state={{ countries }}
          onMouseEnter={() => setHovered("capital")}
          onMouseLeave={() => setHovered(null)}
        >
          <h3>Capital</h3>
        </Link>

        <Link
          to="/flag"
          className="game geo shake-text"
          state={{ countries }}
          onMouseEnter={() => setHovered("flag")}
          onMouseLeave={() => setHovered(null)}
        >
          <h3>Flag</h3>
        </Link>

        <Link
          to="/population"
          className="game title shake-text"
          state={{ countries }}
          onMouseEnter={() => setHovered("population")}
          onMouseLeave={() => setHovered(null)}
        >
          <h3>Population</h3>
        </Link>
      </div>

      <div className="footnote">
        <h4> {hovered ? footnote[hovered] : "Choose a game mode"}</h4>
      </div>
    </div>
  );
};

export default Option;
