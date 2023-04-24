import React from "react"

//img form for open and close big img
function ImagePopup(props) {
    return (
        <div className={`popup popup-image ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup-image__block">
                <img src={props.card.link} alt={props.card.name} className="popup-image__image"/>
                <h2 className="popup-image__text">{props.card.name}</h2>
                <button type="button" className="popup__close-button popup-image__close-button"
                        onClick={props.onClose}></button>
            </div>
            <div className="popup__overlay popup-image__overlay" onClick={props.onClose}></div>
        </div>
    )
}

export default ImagePopup