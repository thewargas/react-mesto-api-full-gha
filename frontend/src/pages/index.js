import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  configValidation,
  configCards,
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  nameInput,
  jobInput,
  formProfile,
  formCard,
  formAvatar,
  configApi,
} from "../utils/constants.js";
import PopupWithDeleteCard from "../components/PopupWithDeleteCard";

// Добавление карточки
const renderCard = (dataCard) => {
  const card = new Card(
    {
      dataCard,
      configCards,
      handleDeleteCard: (id, card) => {
        popupWithDeleteCard.open(() => {
          popupWithDeleteCard.switchLoading(true);
          api
            .deleteCard(id)
            .then(() => {
              card.remove();
              card = null;
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              popupWithDeleteCard.switchLoading(false);
              popupWithDeleteCard.close();
            });
        });
      },
      handlePutLike: (id) => {
        api
          .putLike(id)
          .then((data) => {
            card.countLikes(data);
            card.switchLike(data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleDeleteLike: (id) => {
        api
          .deleteLike(id)
          .then((data) => {
            card.countLikes(data);
            card.switchLike(data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      handleCardClick: (data) => {
        popupWithImage.open(data);
      },
    },
    profileInfo
  );
  return card.getView();
};

// Вывешивание слушателей
buttonAvatar.addEventListener(`click`, () => {
  avatarFormValidation.clearErrors();
  popupWithAvatar.open();
});
buttonAdd.addEventListener(`click`, () => {
  cardFormValidation.clearErrors();
  popupWithCard.open();
});
buttonEdit.addEventListener(`click`, () => {
  nameInput.value = profileInfo.getUserInfo().name.textContent;
  jobInput.value = profileInfo.getUserInfo().about.textContent;

  profileFormValidation.clearErrors();

  popupWithProfile.open();
});

// Воспроизведение с загрузкой страницы
const api = new Api(configApi);

// Создание экземпляра попапа карточки и вывешивание слушателей
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

// Создание экземпляра управления отображением информации о пользователе на странице
const profileInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

// Создание экземпляра попапа профиля и вывешивание слушателей
const popupWithProfile = new PopupWithForm(".popup_type_profile", (evt) => {
  popupWithProfile.switchLoading(true);
  api
    .changeUserInfo(evt)
    .then((data) => {
      profileInfo.setUserInfo(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithProfile.switchLoading(false);
      popupWithProfile.close();
    });
});
popupWithProfile.setEventListeners();

// Создание экземпляра попапа создания карточки и вывешивание слушателей
const popupWithCard = new PopupWithForm(".popup_type_card", (evt) => {
  popupWithCard.switchLoading(true);
  api
    .createCard({ name: evt.title, link: evt.url })
    .then((data) => {
      cardRenderer.addItem(renderCard(data));
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithCard.switchLoading(false);
      popupWithCard.close();
    });
});
popupWithCard.setEventListeners();

// Создание экземпляра попапа изменения аватара и вывешивание слушателей
const popupWithAvatar = new PopupWithForm(".popup_type_avatar", (evt) => {
  popupWithAvatar.switchLoading(true);
  api
    .changeAvatar(evt)
    .then((data) => {
      profileInfo.setAvatar(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupWithAvatar.switchLoading(false);
      popupWithAvatar.close();
    });
});
popupWithAvatar.setEventListeners();

// Создание экземпляра попапа подтверждения удаления карточки
const popupWithDeleteCard = new PopupWithDeleteCard(".popup_type_delete-card");
popupWithDeleteCard.setEventListeners();

// Рендер карточек
const cardRenderer = new Section(
  {
    renderer: (dataCard) => {
      cardRenderer.addItem(renderCard(dataCard));
    },
  },
  ".elements"
);

// Рендер для начальных карточек и загрузка информации профиля
Promise.all([api.getInitialInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileInfo.setUserInfo(userData);
    profileInfo.setAvatar(userData);
    cardRenderer.renderItems(cardsData);
  })
  .catch((error) => {
    console.log(error);
  });

// Включение валидации для формы изменения аватара
const avatarFormValidation = new FormValidator(configValidation, formAvatar);
avatarFormValidation.enableValidation();

// Включение валидации для формы профиля
const profileFormValidation = new FormValidator(configValidation, formProfile);
profileFormValidation.enableValidation();

// Включение валидации для формы добавления карточки
const cardFormValidation = new FormValidator(configValidation, formCard);
cardFormValidation.enableValidation();
