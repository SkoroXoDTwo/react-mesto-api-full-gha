function InfoTooltip({ isOpen, onClose, isError }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      id={`popup_info_tool`}
    >
      <div className="popup__container">
        {
          <button
            className="popup__close-btn"
            type="button"
            onClick={onClose}
          />
        }
        <div
          className={`popup__info-icon ${
            isError ? "popup__info-icon_error" : null
          }`}
        />
        <h2 className="popup__title popup__title_type_info-tool">
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались! "
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
