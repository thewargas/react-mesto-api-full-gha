import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  onValidation,
  isError,
  messageError,
  onOverlay,
  isLoading,
  isOpen,
  onClose,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    onValidation(e);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    onValidation(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onOverlay={onOverlay}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      name={"profile"}
      title={"Редактировать профиль"}
      buttonName={"Сохранить"}
      onSubmit={handleSubmit}
      isError={isError}
    >
      <div className="popup__inputs">
        <input
          id="name-input"
          className={`popup__input popup__input_type_name ${
            isError.name && "popup__input_type_error"
          }`}
          type="text"
          placeholder="Имя и фамилия"
          name="name"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
          required
        />
        <span
          className={`popup__input-error name-input-error ${
            isError.name && "popup__input-error_active"
          }`}
        >
          {isError.name && messageError.name}
        </span>
        <input
          id="job-input"
          className={`popup__input popup__input_type_job ${
            isError.about && "popup__input_type_error"
          }`}
          type="text"
          placeholder="Деятельность"
          name="about"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
          required
        />
        <span
          className={`popup__input-error job-input-error ${
            isError.about && "popup__input-error_active"
          }`}
        >
          {isError && messageError.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
