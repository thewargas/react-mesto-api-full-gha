import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ prop, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = prop.owner._id === currentUser._id;

  const isLiked = prop.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `button element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(prop);
  }

  function handleLikeClick() {
    onCardLike(prop);
  }

  function handleDeleteClick() {
    onCardDelete(prop);
  }
  return (
    <article className="element">
      <figure className="element__container">
        <img
          className="element__image"
          src={prop.link}
          alt={prop.name}
          onClick={handleClick}
        />
        <figcaption className="element__info">
          <h2 className="element__title">{prop.name}</h2>
          <div className="element__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <p
              className="element__like-counter"
              style={{ display: prop.likes.length > 0 ? "block" : "none" }}
            >
              {prop.likes.length}
            </p>
          </div>
          {isOwn && (
            <button
              type="button"
              className="button element__trash-button"
              onClick={handleDeleteClick}
            />
          )}
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;
