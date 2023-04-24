import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [regFormValue, setRegFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegFormValue({
      ...regFormValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(regFormValue);
  };

  return (
    <>
      <section className="authentication-form">
        <h2 className="authentication-form__title">{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-form__inputs">
            <input
              className="authentication-form__input"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={regFormValue.email || ""}
              onChange={handleChange}
              minLength="4"
              maxLength="30"
            />
            <input
              className="authentication-form__input"
              name="password"
              type="password"
              placeholder="Пароль"
              required
              value={regFormValue.password || ""}
              onChange={handleChange}
              minLength="4"
              maxLength="30"
            />
          </div>

          <button
            className={`authentication-form__button popup-add__submit-button`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
        <span className="authentication-form__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="authentication-form__link">
            Войти
          </Link>
        </span>
      </section>
    </>
  );
}

export default Register;
