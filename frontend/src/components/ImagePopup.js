import React from "react";
import closeIcon from "../images/Close-Icon.svg";

function ImagePopup({ onOverlay, isOpen, card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${isOpen && "popup_active"}`}
      onClick={onOverlay}
    >
      <figure className="popup__image-container">
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption>
          <h2 className="popup__image-title">{card.name}</h2>
          <button
            type="button"
            className="button popup__close-button popup__close-button_type_image"
            onClick={onClose}
          >
            <img
              className="popup__close-button-image"
              src={closeIcon}
              alt="Кнопка крестик"
            />
          </button>
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
