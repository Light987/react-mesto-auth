import React, { useState, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import PopupDeleteCard from "./PopupDeleteCard";
import Header from "./Header";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isPopupDeleteCardOpen, setIsPopupDeleteCardOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [deletedCard, setDeletedCard] = useState({});
  const navigate = useNavigate();

  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [isDeleteCardLoading, setIsDeleteCardLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/react-mesto-auth", { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([profileInfo, cards]) => {
          setCurrentUser(profileInfo);
          setCards(
            cards.map((card) => ({
              _id: card._id,
              name: card.name,
              link: card.link,
              likes: card.likes,
              owner: card.owner,
            }))
          );
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleLogin(userData) {
    auth
      .login(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setEmail(userData.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessTooltipStatus(false);
        openInfoTooltip("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleRegister(regUserData) {
    auth
      .register(regUserData)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsSuccessTooltipStatus(true);
        openInfoTooltip("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessTooltipStatus(false);
        openInfoTooltip("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function openInfoTooltip(message, isSuccess) {
    setInfoTooltipMessage(message);
    setIsSuccessTooltipStatus(isSuccess);
    setIsInfoTooltipOpen(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsPopupDeleteCardOpen(false);
    setDeletedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .putLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsDeleteCardLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsDeleteCardLoading(false));
  }

  function handleUpdateUser(newUserInfo) {
    setIsEditProfileLoading(true);

    api
      .patchUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEditProfileLoading(false));
  }

  function handleUpdateAvatar(newAvatar) {
    setIsEditAvatarLoading(true);

    api
      .changeAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEditAvatarLoading(false));
  }

  function handleAddPlace(data) {
    setIsAddPlaceLoading(true);
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsAddPlaceLoading(false));
  }

  function handleDeleteCard(card) {
    setIsPopupDeleteCardOpen(true);
    setDeletedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignout={handleSignOut} email={email} isLoggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/react-mesto-auth" replace />
            ) : (
              <Navigate to="/sign-up" replace />
            )
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login onLogin={handleLogin} title="Вход" buttonText="Войти" />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
              onRegister={handleRegister}
              title="Регистрация"
              buttonText="Зарегистрироваться"
            />
          }
        />
        <Route
          path="/react-mesto-auth"
          element={
            <ProtectedRoute
              element={Main}
              onEditProfile={setIsEditProfilePopupOpen}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              onPopupDeleteCard={setIsPopupDeleteCardOpen}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onDeletedCard={handleDeleteCard}
              cards={cards}
              loggedIn={loggedIn}
              email={email}
              onSignout={handleSignOut}
            />
          }
        />
        <Route
          path="/*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
      </Routes>

      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={isEditProfileLoading ? "Сохранение..." : "Сохранить"}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={isEditAvatarLoading ? "Обновление..." : "Обновить"}
      />
      <AddPlacePopup
        onAddPlace={handleAddPlace}
        onClose={closeAllPopups}
        isOpened={isAddPlacePopupOpen}
        buttonText={isAddPlaceLoading ? "Создание..." : "Создать"}
      />

      <PopupDeleteCard
        onClose={closeAllPopups}
        isOpened={isPopupDeleteCardOpen}
        onCardDelete={handleCardDelete}
        card={deletedCard}
        buttonText={isDeleteCardLoading ? "Удаление..." : "Да"}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        message={infoTooltipMessage}
        isSuccess={isSuccessTooltipStatus}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
