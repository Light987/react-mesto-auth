import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.isOpened]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="popup-add"
      title="Новое место"
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={props.buttonText}
    >
      <input
        value={placeName}
        autoComplete="off"
        required
        name="name"
        id="text-input"
        type="text"
        className="popup__field popup-add__title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleChangePlaceName}
      />
      <span className="title-input-error popup__field-error"></span>
      <input
        value={placeLink}
        autoComplete="off"
        required
        name="link"
        id="url-input"
        type="url"
        className="popup__field popup-add__link"
        placeholder="Ссылка на картинку"
        onChange={handleChangePlaceLink}
      />
      <span className="link-input-error popup__field-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
