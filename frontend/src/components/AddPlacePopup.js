import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <PopupWithForm
      name="gallery"
      title="Новое место"
      btnName={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        value={name}
        onChange={handleNameChange}
        id="name-photo-input"
        name="photo-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error" id="name-photo-input-error"></span>

      <input
        className="popup__input"
        value={link}
        onChange={handleLinkChange}
        id="link-photo-input"
        type="url"
        name="photo-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="link-photo-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
