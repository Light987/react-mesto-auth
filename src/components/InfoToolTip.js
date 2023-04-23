import successImage from "../images/successImage.svg";
import failImage from "../images/failImage.svg";

export default function InfoTooltip(props) {
    return (
        <section
            className={`popup popup-infoToolTip ${
                props.isOpen ? "popup_opened" : ""
            }`}
            onClick={props.onClose}
        >
            <div className="infoToolTip__block popup__container-open">
                <img
                    className="infoToolTip__img"
                    src={props.isSuccess ? successImage : failImage}
                    alt="#"
                />
                <h2 className="infoToolTip__text popup__title-open">{props.message}</h2>
                <button
                    className="popup__close-button popup-image__close-button"
                    type="reset"
                    onClick={props.onClose}
                />
            </div>
            <div className="popup__overlay popup-image__overlay" onClick={props.onClose}></div>
        </section>
    );
}

