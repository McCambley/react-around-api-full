import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';
import { login } from '../utils/auth';

export default function Login({ setLoggedIn, displayTooltip }) {
  const history = useHistory();
  // auth states
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  // tooltip states
  const authForm = React.useRef();

  function handleFormSubmit(e) {
    e.preventDefault();

    // prevent submission if form is invalid
    if (!authForm.current.checkValidity()) {
      authForm.current.reportValidity();
      return;
    }

    login(email, password)
      .then((res) => {
        if (res) {
          displayTooltip(true, 'logged in');
          setLoggedIn(true);
          setEmail('');
          setPassword('');
          history.push('/');
        } else {
          displayTooltip(false, '');
        }
      })
      .catch((error) => {
        displayTooltip(false, '');
      });
  }

  return (
    <AuthForm
      title="Log in"
      button="Log in"
      subtitle="Not a member yet? Sign up here!"
      path="/signup"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      formRef={authForm}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
