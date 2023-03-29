import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      btnName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="link-avatar-input"
        type="url"
        name="avatar-link"
        placeholder="Ссылка на аватар"
        ref={inputRef}
        required
      />
      <span className="popup__input-error" id="link-avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
