import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await response.json();
        console.log(data);

        const countryNames = data.map((country) => {
          return {
            name: country.name.common,
            flag: country.flags.svg,
            capital: country.capital,
            currency: country.currencies,
            population: country.population,
          };
        });

        setCountries(countryNames);
      } catch (error) {
        console.log("Fetching error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Home">
      <Link to="/" className="title">
        <h1>GeoGaunlet</h1>
      </Link>

      <p className="description">
        {" "}
        Test your geography knowledge on the following categories! 🌍
      </p>

      <div className="games">
        <Link to="/capital" className="game" state={{ countries: countries }}>
          <button>Capitals</button>
        </Link>
        <Link to="/flag" className="game" state={{ countries: countries }}>
          <button>Flag</button>
        </Link>

        <Link
          to="/population"
          className="game"
          state={{ countries: countries }}
        >
          <button>Population</button>
        </Link>
      </div>

      <div className="advisory">
        <p>GeoGaunlet v1.0</p>
        <p>||</p>
        <p>some info used are dated</p>
        <p>||</p>
        <p>© Meji </p>
      </div>
    </div>
  );
};

export default Home;
