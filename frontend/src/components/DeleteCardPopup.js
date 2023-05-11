import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  onOverlay,
  isLoading,
  isOpen,
  onClose,
  onDeleteCard,
  card,
}) {
  function handleDeleteCard(e) {
    e.preventDefault();

    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      onOverlay={onOverlay}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      name={"delete-card"}
      title={"Вы уверены?"}
      buttonName={"Да"}
      onSubmit={handleDeleteCard}
    />
  );
}

export default DeleteCardPopup;
