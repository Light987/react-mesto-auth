import '../index.css';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.png';
import {
    avatarAddButton,
    configApi, elementList,
    popupAdd, popupCardDelete,
    popupProfileAvatar, profileAbout, profileAddButton,
    profileAvatar, profileButton, profileImage,
    profileInfo,
    profileName,
    profilePopup, validationConfig, zoomImage, zoomPopupImage
} from '../scripts/utils/constants.js'
import {Card} from '../scripts/components/Card.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Api from "../scripts/components/Api.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete";
import Section from "../scripts/components/Section";
import {FormValidator} from "../scripts/components/FormValidator";

// const whoIsTheGoat = [
//     {name: 'logo', image: logo},
//     {name: 'avatar', image: avatar},
// ];

const api = new Api(configApi)


const handleCardFormSubmit = (evt, data) => {
    popupAddCard.renderLoading(true);
    api.postCard({name: data['name'], link: data['link']})
        .then(
            (res) => {
                cardsSection.addItem(res, true);
                popupAddCard.close();
            })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAddCard.renderLoading();
        });
}


const handleProfileFormSubmit = (evt, data) => {
    popupEditProfile.renderLoading(true);
    api.patchUserInfo({name: data['name'], about: data['about']})
        .then((res) => {
            userInfo.setUserInfo(res);
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditProfile.renderLoading();
        });
}

const handleAvatarFormSubmit = (evt, data) => {
    avatarPopup.renderLoading(true);
    api.changeAvatar(data['link-avatar'])
        .then((res) => {
            userInfo.setUserInfo(res);
            avatarPopup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.renderLoading();
        });
}

const handleRemoveCardClick = (confirmAction, id) => {
    deletePopup.open(() => {
        api.deleteCard(id).then(() => {
            confirmAction();
            deletePopup.close();
        })
            .catch((err) => {
                console.log(err);
            })
    })
}

const handleFavoriteClick = (id, isLiked) => {
    return isLiked ? api.deleteLike(id) : api.putLike(id);
}

const createCard = (cardData) => {
    const card = new Card(cardData,
        '#element',
        (name, link) => imagePopup.open(name, link),
        userInfo.getUserInfo().userId,
        handleRemoveCardClick,
        handleFavoriteClick);
    return card.generateCard();
}

const popupAddCard = new PopupWithForm(popupAdd, handleCardFormSubmit);
const popupEditProfile = new PopupWithForm(profilePopup, handleProfileFormSubmit);
const imagePopup = new PopupWithImage(zoomImage);
const deletePopup = new PopupWithDelete(popupCardDelete);
const avatarPopup = new PopupWithForm(profileAvatar, handleAvatarFormSubmit)
const userInfo = new UserInfo({
    profileName: profileName,
    profileInfo: profileAbout,
    profileAvatar: profileImage
});
let cardsSection;


Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        cardsSection = new Section({items: cards, renderer: createCard}, elementList);
        cardsSection.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });


[popupAddCard, popupEditProfile, imagePopup, deletePopup, avatarPopup].forEach((item) => {
    item.setEventListeners()
});

const formValidators = {}

const enableValidation = (config) => {
    const popupList = Array.from(document.querySelectorAll(config.formSelector));
    popupList.forEach((formElement) => {
        if (formElement.querySelector('form')) {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.querySelector('form').getAttribute('name');
            formValidators[formName] = validator;
            validator.enableValidation();
        }
    });
};

enableValidation(validationConfig);

profileButton.addEventListener('click', () => {
    popupEditProfile.open()
    const userData = userInfo.getUserInfo();
    popupEditProfile.setInput({
        'name': userData.name,
        'about': userData.info,
    });
    formValidators['form'].resetValidation();
});


profileAddButton.addEventListener('click', () => {
    popupAddCard.open()
});

avatarAddButton.addEventListener('click', () => {
    avatarPopup.open()
})
