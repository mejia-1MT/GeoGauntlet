import React from "react";
import { Link } from "react-router-dom";
import "./Modal.css"; // Create a CSS file for modal styles

const Modal = ({ score, onTryAgain, gifUrl }) => {
  const getModalMessage = (score) => {
    switch (score) {
      case 0:
        return "A perfect score! ... of zero! 😅";
      case 1:
        return "One point! Congratulations! 🎉";
      case 2:
        return "Mediocrity called, it wants you back! 😜";
      case 3:
        return "You qualify for a ‘better luck next time’ card! 🙃";
      case 4:
        return "Getting there... or just wandering? 🤔";
      case 5:
        return "Halfway to almost right! 😅";
      case 6:
        return "Close enough to celebrate... a little! 🥳";
      case 7:
        return "So close! A blindfolded guess might help! 👀";
      case 8:
        return "Practically a genius! Just kidding! 😏";
      case 9:
        return "Almost there! More brainpower needed! 🧠";
      case 10:
        return "Don’t let it go to your head! 😜";
      default:
        return "Geo master! But even the best trip sometimes! 😂";
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ backgroundImage: `url(${gifUrl})` }}
      >
        <div className="modal-message-container">
          <h2 className="modal-message">{getModalMessage(score)}</h2>

          <p className="modal-text">You've achieved a whopping score of</p>
          <p className="modal-score"> {score} </p>
        </div>
        <div className="modal-buttons">
          <button className="modal-button" onClick={onTryAgain}>
            Try Again
          </button>
          <Link className="modal-button" to="/">
            <button>Main Menu</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
