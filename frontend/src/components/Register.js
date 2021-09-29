import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';
import { register } from '../utils/auth';

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

    register(email, password)
      .then((res) => {
        if (res) {
          displayTooltip(true, 'registered');
          setEmail('');
          setPassword('');
          history.push('/signin');
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
      title="Sign up"
      button="Sign up"
      subtitle="Already a member? Log in here!"
      path="/signin"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      formRef={authForm}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
