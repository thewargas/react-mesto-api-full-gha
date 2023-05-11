import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [isError, setError] = useState({});
  const [messageError, setMessageError] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Auth.checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    Promise.all([api.getInitialInfo(), api.getInitialCards()])

      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })

      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const close = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isDeleteCardPopupOpen ||
      isImagePopupOpen ||
      isInfoTooltipPopupOpen
    ) {
      document.addEventListener("keydown", close);
      return () => document.removeEventListener("keydown", close);
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isDeleteCardPopupOpen,
    isImagePopupOpen,
    isInfoTooltipPopupOpen,
  ]);

  function handleRegister(inputs) {
    Auth.register(inputs.password, inputs.email)
      .then(() => {
        setAuth(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((error) => {
        setAuth(false);
        console.log(error);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleAuthorize(inputs) {
    Auth.authorize(inputs.password, inputs.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setEmail(inputs.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail("");
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => card._id !== c._id));
        setCard({});
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateUser(inputs) {
    setLoading(true);
    api
      .changeUserInfo(inputs)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(input, clearInput) {
    setLoading(true);
    api
      .changeAvatar(input)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        clearInput();
      });
  }

  function handleAddPlaceSubmit(inputs, clearInputs) {
    setLoading(true);
    api
      .createCard(inputs)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        clearInputs();
      });
  }

  function validateInputs(e) {
    if (!e.target.validity.valid) {
      setError({
        ...isError,
        [e.target.name]: true,
      });
      setMessageError({
        ...messageError,
        [e.target.name]: e.target.validationMessage,
      });
    } else {
      setError({
        ...isError,
        [e.target.name]: false,
      });
      setMessageError({
        ...messageError,
        [e.target.name]: "",
      });
    }
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleTrashButtonClick = (card) => {
    setDeleteCardPopupOpen(true);
    setCard(card);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipPopupOpen(false);

    setError({});
    setMessageError({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleTrashButtonClick}
              cards={cards}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthForm
              onValidation={validateInputs}
              isError={isError}
              messageError={messageError}
              onSubmit={handleRegister}
              title={"Регистрация"}
              button={"Зарегистрироваться"}
            >
              <p className="auth__paragraph">
                Уже зарегистрированы?{" "}
                <Link to="/sign-in" className="auth__link">
                  Войти
                </Link>
              </p>
            </AuthForm>
          }
        />
        <Route
          path="/sign-in"
          element={
            <AuthForm
              onValidation={validateInputs}
              isError={isError}
              messageError={messageError}
              onSubmit={handleAuthorize}
              title={"Вход"}
              button={"Войти"}
            />
          }
        />
      </Routes>

      <Footer />

      <EditAvatarPopup
        onValidation={validateInputs}
        isError={isError}
        messageError={messageError}
        onOverlay={handleOverlayClick}
        isLoading={isLoading}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        onValidation={validateInputs}
        isError={isError}
        messageError={messageError}
        onOverlay={handleOverlayClick}
        isLoading={isLoading}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onValidation={validateInputs}
        isError={isError}
        messageError={messageError}
        onOverlay={handleOverlayClick}
        isLoading={isLoading}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <DeleteCardPopup
        onOverlay={handleOverlayClick}
        isLoading={isLoading}
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        card={card}
      />
      <ImagePopup
        onOverlay={handleOverlayClick}
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        onOverlay={handleOverlayClick}
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        isAuth={isAuth}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
