import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef(null);

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpened]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    function handleChangeAvatar() {
        return avatarRef.current.value;
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="popup-avatar"
            title="Обновить аватар"
            isOpened={props.isOpened}
            onClose={props.onClose}
            buttonText={props.buttonText}>
            <input
                ref={avatarRef}
                autoComplete="off"
                required
                name="link-avatar"
                id="avatar-input"
                type="url"
                className="popup__field popup-avatar__link"
                placeholder="Ссылка на картинку"
                onChange={handleChangeAvatar}
            />
            <span className="avatar-input-error popup__field-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;