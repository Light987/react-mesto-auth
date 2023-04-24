import React from "react"


function PopupWithForm(props) {
    return (
        <div className={`popup ${props.name} ${props.isOpened ? "popup_opened" : ""}`}>
            <form name="form" className="popup__form" onSubmit={props.onSubmit}>
                <h2 className="popup__header">{props.title}</h2>
                {props.children}
                <button type="submit" name="submitForm"
                        className="popup__submit-button">{props.buttonText || "Сохранить"}</button>
            </form>
            <button type="button" className="popup__close-button" onClick={props.onClose}/>
            <div className="popup__overlay" onClick={props.onClose}></div>
        </div>
    )
}

export default PopupWithForm