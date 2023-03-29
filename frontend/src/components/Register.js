import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ handleRegister }) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onRegister = (e) => {
    e.preventDefault();
    handleRegister(formValue.password, formValue.email);
  };

  return (
    <main>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form" onSubmit={onRegister}>
            <input
              className="auth__input"
              name="email"
              value={formValue.email}
              placeholder="Email"
              onChange={handleChange}
              type="email"
              required
            />
            <input
              className="auth__input"
              name="password"
              value={formValue.password}
              placeholder="Пароль"
              onChange={handleChange}
              minLength={6}
              type="password"
              required
            />
            <button className="auth__btn-submit">Зарегистрироваться</button>
          </form>
          <button
            className="auth__btn-footer"
            onClick={() => navigate("/sign-in")}
          >
            Уже зарегистрированы? Войти
          </button>
        </div>
      </section>
    </main>
  );
}

export default Register;
