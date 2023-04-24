import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {
  function handleSubmit(event) {
    event.preventDefault();

    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpened={props.isOpened}
    />
  );
}

export default PopupDeleteCard;
