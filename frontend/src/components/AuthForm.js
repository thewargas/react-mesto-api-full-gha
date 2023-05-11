import React, { useRef, useState, useEffect } from "react";

function AuthForm({
  onValidation,
  isError,
  messageError,
  onSubmit,
  title,
  button,
  children,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef();
  const [isValidity, setValidity] = useState(true);

  useEffect(() => {
    setValidity(formRef.current.checkValidity());
  }, [isError]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    onValidation(e);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    onValidation(e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      password,
      email,
    });
  }

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form
        className="auth__form"
        ref={formRef}
        name={`auth-form`}
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          className={`auth__input ${isError.email && "auth__input_type_error"}`}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeEmail}
          value={email || ""}
          required
        />
        <span
          className={`auth__input-error ${
            isError.email && "auth__input-error_active"
          }`}
        >
          {isError.email && messageError.email}
        </span>
        <input
          className={`auth__input ${
            isError.password && "auth__input_type_error"
          }`}
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={handleChangePassword}
          value={password || ""}
          minLength="3"
          required
        />
        <span
          className={`auth__input-error ${
            isError.password && "auth__input-error_active"
          }`}
        >
          {isError.password && messageError.password}
        </span>
        <button
          disabled={!isValidity}
          type="submit"
          className={`button auth__submit-button ${
            !isValidity && "button_disabled"
          }`}
        >
          {button}
        </button>
      </form>
      {children}
    </div>
  );
}

export default AuthForm;
