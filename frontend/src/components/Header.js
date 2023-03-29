import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

function Header({ onSignOut, loginUser }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo"></div>
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__auth-btn">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__auth-btn">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <nav
                  className={`header__menu ${
                    isOpenMenu ? "header__menu_open" : null
                  }`}
                >
                  <p className="header__email">{loginUser}</p>
                  <button className="header__exit-btn" onClick={onSignOut}>
                    Выйти
                  </button>
                </nav>
                <button
                  className={`header__burger-btn ${
                    isOpenMenu ? " header__burger-btn_open" : null
                  }`}
                  onClick={openMenu}
                />
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
