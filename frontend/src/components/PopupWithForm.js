import React, { useState, useEffect, useRef } from "react";
import closeIcon from "../images/Close-Icon.svg";

function PopupWithForm({
  onOverlay,
  isLoading,
  isOpen,
  onClose,
  name,
  title,
  buttonName,
  onSubmit,
  children,
  isError,
}) {
  const formRef = useRef();
  const [isValidity, setValidity] = useState(true);

  useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isOpen, isError]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_active"}`}
      onClick={onOverlay}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          action="#"
          name={`popup-form-${name}`}
          onSubmit={onSubmit}
          ref={formRef}
          noValidate
        >
          {children}
          <button
            disabled={!isValidity}
            type="submit"
            className={`button popup__submit-button ${
              !isValidity && "button_disabled"
            }`}
          >
            {isLoading ? "Сохранение" : buttonName}
          </button>
        </form>
        <button
          type="button"
          className="button popup__close-button popup__close-button_type_profile"
          onClick={onClose}
        >
          <img
            className="popup__close-button-image"
            src={closeIcon}
            alt="Кнопка крестик"
          />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
