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
            buttonText={props.onLoading ? "Удаление" : "Да"}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpened={props.isOpened}
            onCloseOverlay={props.onCloseOverlay}
        />
    );
}

export default PopupDeleteCard;