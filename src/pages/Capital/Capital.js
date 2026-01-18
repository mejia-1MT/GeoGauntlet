import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Capital.css";
import { fetchGif } from "../../utilities/FetchGif";

import Sent from "../../assets/sent-stroke-rounded";
import BackIcon from "../../assets/arrow-left-01-stroke-rounded";
import Modal from "../../components/Modal";

const Capital = ({ handleTryAgain }) => {
  let { state } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [animate, setAnimate] = useState(null);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("capitalBestScore")) || 0;
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGifUrl, setModalGifUrl] = useState("");

  const capitals = state.countries
    .filter((country) => country.capital)
    .map((country) => country.capital)
    .flat();

  const fillCountries = useCallback(() => {
    const newList = [];
    while (newList.length < 20) {
      newList.push(
        state.countries[Math.floor(Math.random() * state.countries.length)]
      );
    }
    setCountryList(newList);
  }, [state.countries]);

  useEffect(() => {
    fillCountries();
  }, [fillCountries]); // Only fill countries on mount

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAnswer(inputValue);
    if (inputValue) {
      const filteredSuggestions = capitals
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = async () => {
    const checkCapital = countryList[0].capital.map((capital) => {
      if (capital.toLowerCase() === answer.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });
    setAnswered(true);
    if (checkCapital.includes(true)) {
      const newScore = score + 1; // Update score
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("populationBestScore", newScore); // Save to local storage
      }

      setTimeout(() => {
        setAnswer("");
        setSuggestions([]);
        setAnswered(false);
        setAnimate(true);
        setTimeout(() => {
          setCountryList((prev) => prev.slice(1));
          if (countryList.length < 5) {
            fillCountries();
          }
          setAnimate(false);
        }, 1000);
      }, 2000);
    } else {
      const gifUrl = await fetchGif(); // Fetch the GIF URL
      if (gifUrl) {
        setModalVisible(true);
        setModalGifUrl(gifUrl); // Store the GIF URL in state
      }
    }
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the modal
  };

  const handleTryAgainClick = () => {
    handleTryAgain(); // Call the function to reset the game
    handleModalClose(); // Close the modal
  };

  return (
    <div className="Capital">
      {countryList.slice(0, 2).map((country, index) => (
        <div
          key={index}
          className={`capital-guess ${animate ? "population-slide" : ""}`}
          style={{ backgroundImage: `url(${country.flag})` }}
        >
          <div className="capital-inset">
            <h1 className="capital-name">"{country.name}"</h1>
            {index === 0 ? (
              <div className="capital-answers-container">
                <div className="capital-input-container">
                  <input
                    className="capital-input"
                    placeholder="Enter Capital"
                    type="text"
                    value={answer}
                    onChange={handleChange} // Track input value here
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} // Handle "Enter" key press
                  />
                  <button className="capital-button" onClick={handleSubmit}>
                    <Sent className="sent" />
                  </button>
                </div>
                <div className="capital-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      className="capital-element"
                      key={index}
                      onClick={() => {
                        setAnswer(suggestion);
                        setSuggestions([]);
                      }}
                    >
                      <p>{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {answered && (
              <div
                className={`capital-capital ${answered ? "from-under" : ""}`}
              >
                {country.capital}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="population-ui">
        <Link to="/" className="back">
          <BackIcon />
        </Link>
        <p className="score">Score: {score}</p>
        <p className="best-score">Best Score: {bestScore}</p>
      </div>
      {modalVisible && (
        <Modal
          score={score}
          onTryAgain={handleTryAgainClick}
          gifUrl={modalGifUrl}
        />
      )}
    </div>
  );
};

export default Capital;
