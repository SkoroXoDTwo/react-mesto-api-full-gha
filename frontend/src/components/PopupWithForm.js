function PopupWithForm({
  name,
  title,
  btnName,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id={`popup_${name}`}
    >
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-btn" type="submit">
            {btnName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
