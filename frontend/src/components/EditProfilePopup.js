import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSubmitting,
  checkValidity,
  onOverlayClick,
}) {
  const [name, updateName] = React.useState('');
  const [description, updateAbout] = React.useState('');
  const [isNameInputValid, updateNameInputValidity] = React.useState(true);
  const [isAboutInputValid, updateAboutInputValidity] = React.useState(true);
  const [nameErrorMessage, updateNameErrorMessage] = React.useState('');
  const [aboutErrorMessage, updateAboutErrorMessage] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChange(evt, stateUpdater, inputValidityUpdater, errorMessageUpdater) {
    stateUpdater(evt.target.value);
    checkValidity(evt, inputValidityUpdater, errorMessageUpdater);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    updateName(currentUser.name || '');
    updateAbout(currentUser.about || '');
    updateNameInputValidity(true);
    updateAboutInputValidity(true);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Edit Profile"
      buttonLabel={isSubmitting ? 'Saving...' : 'Save'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(evt) =>
            handleChange(evt, updateName, updateNameInputValidity, updateNameErrorMessage)
          }
          className="popup__input popup__input_role_name"
          required
          minLength="2"
          maxLength="40"
        />
        <span
          className={`popup__input-error popup__input-error_name ${
            !isNameInputValid && 'popup__input-error_active'
          }`}
        >
          {nameErrorMessage}
        </span>
        <input
          type="text"
          id="title"
          name="about"
          placeholder="Title"
          value={description}
          onChange={(evt) =>
            handleChange(evt, updateAbout, updateAboutInputValidity, updateAboutErrorMessage)
          }
          className="popup__input popup__input_role_title"
          required
          minLength="2"
          maxLength="200"
        />
        <span
          className={`popup__input-error popup__input-error_title ${
            !isAboutInputValid && 'popup__input-error_active'
          }`}
        >
          {aboutErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
