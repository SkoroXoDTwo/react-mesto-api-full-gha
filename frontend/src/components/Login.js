import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onLogin = (e) => {
    e.preventDefault();
    handleLogin(formValue.password, formValue.email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <main>
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form" onSubmit={onLogin}>
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
            <button className="auth__btn-submit">Войти</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
