import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../utils/auth';

export default function AuthForm({
  title,
  button,
  subtitle,
  path,
  email,
  setEmail,
  password,
  setPassword,
  formRef,
  handleFormSubmit,
  setLoggedIn,
}) {
  const history = useHistory();

  function handleDemoClick(e) {
    login('test@around.com', 'testtest')
      .then((res) => {
        setLoggedIn(true);
        setEmail('');
        setPassword('');
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="auth">
      <form action="login" className="auth__form" ref={formRef} onSubmit={handleFormSubmit}>
        <h1 className="auth__title">{title}</h1>
        <div className="auth__input-container">
          <input
            type="email"
            name="email"
            className="auth__input"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            className="auth__input"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth__button">
          {button}
        </button>
        <button type="button" onClick={handleDemoClick} className="auth__button">
          Try demo
        </button>
        <Link to={path} className="auth__subtitle">
          {subtitle}
        </Link>
      </form>
    </div>
  );
}
