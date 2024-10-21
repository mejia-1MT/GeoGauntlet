import React from "react";
import "./Modal.css"; // Create a CSS file for modal styles

const Modal = ({ message, onClose, onTryAgain }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onTryAgain}>Try Again</button>
        <button onClick={onClose}>Main Menu</button>
      </div>
    </div>
  );
};

export default Modal;
