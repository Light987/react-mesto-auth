import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
        setIsLoading(false);
    }, [currentUser, props.isOpened]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)

        props.onUpdateUser({
            name: name,
            about: about,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpened={props.isOpened}
            onClose={props.onClose}
            buttonText={isLoading ? "Сохранение..." : "Сохранить"}
            name="profile-popup"
            title="Редактировать профиль">
            <input
                onChange={handleChangeName}
                value={name || ""}
                autoComplete="off"
                required
                name="name"
                id="name-input"
                type="text"
                className="popup__field popup__field_name"
                placeholder="Введите имя"
                minLength="2"
                maxLength="40"/>
            <span className="name-input-error popup__field-error"></span>
            <input
                onChange={handleChangeAbout}
                value={about || ""}
                autoComplete="off"
                required
                name="about"
                id="about-input"
                type="text"
                className="popup__field popup__field_about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"/>
            <span className="about-input-error popup__field-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;