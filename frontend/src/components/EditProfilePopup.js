import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      btnName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        value={name}
        onChange={handleNameChange}
        id="name-profile-input"
        name="user-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error" id="name-profile-input-error"></span>

      <input
        className="popup__input"
        value={description}
        onChange={handleDescriptionChange}
        id="about-profile-input"
        name="user-about"
        placeholder="Место работы"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className="popup__input-error"
        id="about-profile-input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
