import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard(props) {
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true)

        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm
            name="popup-delete"
            title="Вы уверены?"
            buttonText={isLoading ? "Удаление" : "Да"}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpened={props.isOpened}
        />
    );
}

export default PopupDeleteCard;