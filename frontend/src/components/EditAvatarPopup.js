import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  onValidation,
  isError,
  messageError,
  onOverlay,
  isLoading,
  isOpen,
  onClose,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function clearInput() {
    avatarRef.current.value = "";
  }

  function handleChangeUrl(e) {
    onValidation(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      clearInput
    );
  }

  return (
    <PopupWithForm
      onOverlay={onOverlay}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      name={"avatar"}
      title={"Обновить аватар"}
      buttonName={"Сохранить"}
      onSubmit={handleSubmit}
      isError={isError}
    >
      <div className="popup__inputs">
        <input
          id="url-avatar-input"
          className={`popup__input popup__input_type_url-avatar ${
            isError.avatar && "popup__input_type_error"
          }`}
          type="url"
          placeholder="Ссылка на аватар"
          name="avatar"
          onChange={handleChangeUrl}
          ref={avatarRef}
          required
        />
        <span
          className={`popup__input-error url-avatar-input-error ${
            isError.avatar && "popup__input-error_active"
          }`}
        >
          {isError.avatar && messageError.avatar}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
