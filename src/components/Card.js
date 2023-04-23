import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const deleteButtonClassName = `element__delete_active ${
        isOwn && 'element__delete'
    }`;

    const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${
        isLiked && "element__like_active"
    }`;

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
        props.onPopupDeleteCard(true);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <li className="element">
            <img className="element__image"
                 src={props.card.link}
                 alt={props.card.name}
                 onClick={handleCardClick}/>
            <button className={deleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="element__lower-part">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card