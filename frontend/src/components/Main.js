import React from "react";
import editButton from "../images/edit-button.svg";
import addButton from "../images/add-button.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <figure className="profile__container">
          <button
            className="button profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__edit-button-image profile__edit-button-image_type_avatar"
              src={editButton}
              alt="Кнопка изменить аватар"
            />
          </button>
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватарка профиля пользователя"
          />
          <figcaption className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              className="button profile__edit-button"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-button-image"
                src={editButton}
                alt="Кнопка изменить профиль"
              />
            </button>
          </figcaption>
        </figure>
        <button
          type="button"
          className="button profile__add-button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-image"
            src={addButton}
            alt="Кнопка плюс"
          />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              prop={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
