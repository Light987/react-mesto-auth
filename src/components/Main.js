import React, {useContext} from "react"
import Card from './Card';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <main className="main">
                <section className="profile">
                    <div className="profile__avatar">
                        <img className="profile__image" src={currentUser.avatar} alt="Аватар"/>
                        <button className="profile__edit-avatar" type="button"
                                onClick={() => {
                                    props.onEditAvatar(true)
                                }}/>
                    </div>


                    <div className="profile-info">
                        <h1 className="profile-info__name">{currentUser.name}</h1>
                        <p className="profile-info__about">{currentUser.about}</p>
                        <button type="button"
                                className="profile-info__edit-button"
                                onClick={() => {
                                    props.onEditProfile(true)
                                }}/>
                    </div>

                    <button type="button" className="profile__add-button"
                            onClick={() => {
                                props.onAddPlace(true)
                            }}></button>
                </section>
                <section className="elements">
                    <ul className="elements__list">
                        {props.cards.map((card) => (
                            <Card key={card._id}
                                  card={card}
                                  onCardLike={props.onCardLike}
                                  onCardClick={props.onCardClick}
                                  onCardDelete={props.onDeletedCard}
                                  onPopupDeleteCard={props.onPopupDeleteCard}
                            />
                        ))}
                    </ul>
                </section>
            </main>
        </>
    )
}

export default Main