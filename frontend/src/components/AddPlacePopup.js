import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  onValidation,
  isError,
  messageError,
  onOverlay,
  isLoading,
  isOpen,
  onClose,
  onAddPlace,
}) {
  const nameRef = useRef();
  const urlRef = useRef();

  useEffect(() => {
    nameRef.current.value = "";
    urlRef.current.value = "";
  }, [isOpen]);

  function handleChangeInputs(e) {
    onValidation(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: urlRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onOverlay={onOverlay}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      name={"card"}
      title={"Новое место"}
      buttonName={"Создать"}
      onSubmit={handleSubmit}
      isError={isError}
    >
      <div className="popup__inputs">
        <input
          id="title-input"
          className={`popup__input popup__input_type_title ${
            isError.title && "popup__input_type_error"
          }`}
          type="text"
          placeholder="Название"
          name="title"
          minLength="2"
          maxLength="30"
          onChange={handleChangeInputs}
          ref={nameRef}
          required
        />
        <span
          className={`popup__input-error title-input-error ${
            isError.title && "popup__input-error_active"
          }`}
        >
          {isError.title && messageError.title}
        </span>
        <input
          id="url-mesto-input"
          className={`popup__input popup__input_type_url-mesto ${
            isError.url && "popup__input_type_error"
          }`}
          type="url"
          placeholder="Ссылка на картинку"
          name="url"
          onChange={handleChangeInputs}
          ref={urlRef}
          required
        />
        <span
          className={`popup__input-error url-mesto-input-error ${
            isError.url && "popup__input-error_active"
          }`}
        >
          {isError.url && messageError.url}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
