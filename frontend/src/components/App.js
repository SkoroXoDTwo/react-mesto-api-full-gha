import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api";
import apiAuth from "../utils/AuthApi";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import avatarLoaderGif from "../images/avatar-loader.gif";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: avatarLoaderGif,
  });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [loginUser, setLoginUser] = useState("");

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"))

  const isOpenPopup =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard;

  useEffect(() => {
    checkToken();

    getInitialsData();
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    if (isOpenPopup) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpenPopup]);

  const checkToken = () => {
    const jwtThenLocalStorage = localStorage.getItem("jwt")

    if (jwtThenLocalStorage) {
      apiAuth
        .checkToken(jwtThenLocalStorage)
        .then((res) => {
          setLoginUser(res.data.email);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
    }
  };

  const getInitialsData = () => {
    const jwtThenLocalStorage = localStorage.getItem("jwt");

    if (jwtThenLocalStorage) {
      api
        .getInitialUserInfo(jwtThenLocalStorage)
        .then((user) => {
          setCurrentUser(user.data);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getInitialCards(jwtThenLocalStorage)
        .then((cards) => {
          setCards(cards.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRegister = (password, email) => {
    apiAuth
      .postRegister(password, email)
      .then((_) => {
        setIsErrorAuth(false);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsErrorAuth(true);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = (password, email) => {
    apiAuth
      .postLogin(password, email)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          setJwt(data.token)
          checkToken();
          getInitialsData();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsErrorAuth(true);
        setIsInfoTooltipOpen(true);
      });
  };

  const resetProfileData = () => {
    setCurrentUser({
      name: "Загрузка...",
      about: "Загрузка...",
      avatar: avatarLoaderGif,
    });
    setCards([]);
    setLoginUser("");
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setJwt('');
    setIsLoggedIn(false);
    navigate("/sign-in");
    resetProfileData();
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((stateCard) =>
            stateCard._id === card._id ? newCard.data : stateCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id, jwt)
      .then((_) => {
        setCards((state) =>
          state.filter((stateCard) => stateCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);

    api
      .pathUserInfo(userInfo, jwt)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);

    api
      .patchAvatar(avatar, jwt)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    setIsLoading(true);

    api
      .postCard(card, jwt)
      .then((card) => {
        setCards([card.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header onSignOut={handleSignOut} loginUser={loginUser} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  Component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <PopupWithForm name="delete_item" title="Вы уверены?" btnName="Да" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isError={isErrorAuth}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
