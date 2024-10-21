import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Capital.css";

import Sent from "../assets/sent-stroke-rounded";
import BackIcon from "../assets/arrow-left-01-stroke-rounded";
import Modal from "../components/Modal";

const Capital = () => {
  let { state } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("capitalBestScore")) || 0;
  });

  const [modalVisible, setModalVisible] = useState(false);

  const capitals = state.countries
    .filter((country) => country.capital)
    .map((country) => country.capital)
    .flat(); // this is an array, i want to flat those with more than 1 values in array

  const fillCountries = () => {
    const newList = [];

    while (newList.length < 20) {
      const randomIndex = Math.floor(Math.random() * state.countries.length);
      const selectedCountry = state.countries[randomIndex];

      if (selectedCountry.capital) {
        newList.push(selectedCountry);
      }
    }

    setCountryList(newList);
  };

  useEffect(() => {
    fillCountries();
  }, []); // Only fill countries on mount

  const handleChange = (e) => {
    const filteredSuggestions = capitals
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(e.target.value.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="Capital">
      {countryList.slice(0, 2).map((country, index) => (
        <div
          key={index}
          className="capital-guess"
          style={{ backgroundImage: `url(${country.flag})` }}
        >
          <h1 className="capital-name">{country.name}</h1>
          {index === 0 ? (
            <>
              <div className="capital-input-container">
                <input
                  className="capital-input"
                  placeholder="Enter Capital"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
                <button className="capital-button">
                  <Sent className="sent" />
                </button>
                <div className="capital-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div key={index}>
                      <p>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
      <div className="population-ui">
        <Link to="/" className="back">
          <BackIcon />
        </Link>
        <p className="score">Score: {score}</p>
        <p className="best-score">Best Score: {bestScore}</p>
      </div>
    </div>
  );
};

export default Capital;
