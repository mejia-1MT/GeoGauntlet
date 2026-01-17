import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Option = ({ openMenu }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/all?fields=name,population,flags,capital,currencies`
        );
        const data = await response.json();
        console.log("***Logging fetched data from the API***");
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

  console.log(countries);

  if (!openMenu) return null;

  return (
    <div className="menu">
      <div className="games">
        <Link
          to="/capital"
          className="game shake-text"
          state={{ countries: countries }}
        >
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
    </div>
  );
};

export default Option;
