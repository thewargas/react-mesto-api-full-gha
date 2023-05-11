import React from "react";
import closeIcon from "../images/Close-Icon.svg";
import successfullyIcon from "../images/successfully.svg";
import deniedIcon from "../images/denied.svg";

function infoTooltip({ onOverlay, isOpen, onClose, isAuth }) {
  return (
    <div
      className={`popup popup_type_info-tool ${isOpen && "popup_active"}`}
      onClick={onOverlay}
    >
      <div className="popup__container">
        <img
          className="popup__reg-image"
          src={isAuth ? successfullyIcon : deniedIcon}
          alt={
            isAuth ? "Значок успешной регистрации" : "Значок ошибки регистрации"
          }
        />
        <p className="popup__reg-image-title">
          {isAuth
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
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
      </div>
    </div>
  );
}

export default infoTooltip;
