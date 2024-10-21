import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Population.css";

import BackIcon from "../assets/arrow-left-01-stroke-rounded";
import Triangle from "../assets/triangle-stroke-rounded";
import Modal from "../components/Modal"; // Import the Modal component

const Population = ({ handleTryAgain }) => {
  let { state } = useLocation();
  const [countryList, setCountryList] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("populationBestScore")) || 0; // Retrieve bestScore from local storage
  });
  const [clickedIndex, setClickedIndex] = useState(null);
  const [animate, setAnimate] = useState(null);
  const [populationAnimate, setPopulationAnimate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const fillCountries = () => {
    const newList = [];

    while (newList.length < 20) {
      newList.push(
        state.countries[Math.floor(Math.random() * state.countries.length)]
      );
    }

    setCountryList(newList);
  };

  useEffect(() => {
    fillCountries();
  }, []); // Only fill countries on mount

  const handleAnswer = (answer, index) => {
    setAnswered(true);
    setClickedIndex(index);
    const correctAnswer =
      countryList[0].population < countryList[index].population;

    setPopulationAnimate(true);

    if (correctAnswer === answer) {
      const newScore = score + 1; // Update score
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("populationBestScore", newScore); // Save to local storage
      }

      setTimeout(() => {
        setAnimate(true);
        setTimeout(() => {
          setPopulationAnimate(false);
          setCountryList((prev) => prev.slice(1));
          if (countryList.length < 5) {
            fillCountries();
          }
          setAnimate(false);
          setClickedIndex(false);
        }, 1000);
      }, 2000);
    } else {
      setTimeout(() => {
        setModalVisible(true); // Open the modal
      }, 2000);
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
    <div className="Population">
      <div className={`population-slider`}>
        {countryList.slice(0, 3).map((country, index) => (
          <div
            key={index}
            className={`population-choices ${
              animate ? "population-slide" : ""
            }`}
            style={{ backgroundImage: `url(${country.flag})` }}
          >
            <div className="population-inset">
              <div className="population-country-name">"{country.name}"</div>
              {index !== 0 ? (
                <div>
                  {answered && clickedIndex === index ? (
                    <div
                      className={`population-country-population  ${
                        populationAnimate ? "from-under" : ""
                      }`}
                    >
                      {country.population.toLocaleString()}
                    </div>
                  ) : (
                    <div className="population-buttons">
                      <button onClick={() => handleAnswer(true, index)}>
                        Higher <Triangle />
                      </button>
                      <button onClick={() => handleAnswer(false, index)}>
                        Lower{" "}
                        <Triangle style={{ transform: "rotate(180deg)" }} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="population-country-population">
                  {country.population.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="population-ui">
        <Link to="/" className="back">
          <BackIcon />
        </Link>
        <p className="score">Score: {score}</p>
        <p className="best-score">Best Score: {bestScore}</p>

        <div className="vs">vs</div>
      </div>

      {modalVisible && ( // Render the modal when visible
        <Modal
          message="Incorrect! Try Again."
          onClose={handleModalClose}
          onTryAgain={handleTryAgainClick}
        />
      )}
    </div>
  );
};

export default Population;
