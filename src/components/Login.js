import { useState } from "react";

const Login = (props) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onLogin(formValue);
  };

  return (
    <>
      <section className="authentication-form">
        <h2 className="authentication-form__title">{props.title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-form__inputs">
            <label>
              <input
                className="authentication-form__input"
                name="email"
                type="email"
                placeholder="Email"
                required
                value={formValue.email || ""}
                onChange={handleChange}
                minLength="4"
                maxLength="30"
              />
            </label>
            <label>
              <input
                className="authentication-form__input"
                name="password"
                type="password"
                placeholder="Пароль"
                required
                value={formValue.password || ""}
                onChange={handleChange}
                minLength="4"
                maxLength="30"
              />
            </label>
          </div>
          <button
            className={`authentication-form__button popup-add__submit-button`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
