import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Flag.css";
import { fetchGif } from "../../utilities/FetchGif";

import Sent from "../../assets/sent-stroke-rounded";
import BackIcon from "../../assets/arrow-left-01-stroke-rounded";
import Modal from "../../components/Modal";

const Flag = ({ handleTryAgain }) => {
  const { state } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalGifUrl, setModalGifUrl] = useState(""); // State for GIF UR
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("flagBestScore")) || 0;
  });
  const countries = state.countries
    .filter((country) => country.name)
    .map((country) => country.name);

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

  const handleSubmit = async () => {
    console.log("submitted");

    setAnswered(true);
    if (answer.toLowerCase() === countryList[0].name.toLowerCase()) {
      const newScore = score + 1; // Update score
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("flagBestScore", newScore); // Save to local storage
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
      // Wrong answer
      // First, show the correct answer for 2 seconds
      setTimeout(async () => {
        const gifUrl = await fetchGif(); // fetch GIF after delay
        if (gifUrl) {
          setModalGifUrl(gifUrl);
          setModalVisible(true); // show modal after delay
        }
      }, 1500); // 2-second delay
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAnswer(inputValue);
    if (inputValue) {
      const filteredSuggestions = countries
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(e.target.value.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleTryAgainClick = () => {
    handleTryAgain();
    handleModalClose();
  };

  return (
    <section className="Flag">
      {countryList.slice(0, 2).map((country, index) => (
        <article
          key={index}
          className={`flag-guess ${animate ? "population-slide" : ""}`}
          style={{ backgroundImage: `url(${country.flag})` }}
        >
          <div className="flag-inset">
            <p className="flag-question">
              What country does this flag belong to?
            </p>
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
                {country.name}
              </div>
            )}
          </div>
        </article>
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
    </section>
  );
};

export default Flag;
