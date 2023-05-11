import React from "react";
import logo from "../images/logo-mesto.svg";
import { Route, Routes, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место" />
      <div className="header__info">
        {email && <p className="header__email-text">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                to="/sign-in"
                className="header__link"
                onClick={onSignOut}
                style={{ color: `rgb(169, 169, 169)` }}
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
