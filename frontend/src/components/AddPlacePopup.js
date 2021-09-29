import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, updateName] = React.useState('');
  const [link, updateLink] = React.useState('');
  const [isNameInputValid, updateNameInputValidity] = React.useState(true);
  const [isLinkInputValid, updateLinkInputValidity] = React.useState(true);
  const [nameErrorMessage, updateNameErrorMessage] = React.useState('');
  const [linkErrorMessage, updateLinkErrorMessage] = React.useState('');

  function handleChange(e, stateUpdater, inputValidityUpdater, errorMessageUpdater) {
    stateUpdater(e.target.value);
    props.checkValidity(e, inputValidityUpdater, errorMessageUpdater);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    updateName('');
    updateLink('');
    updateNameInputValidity(true);
    updateLinkInputValidity(true);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New Place"
      buttonLabel={props.isSubmitting ? 'Saving...' : 'Save'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          type="text"
          id="place"
          name="name"
          placeholder="Title"
          className="popup__input popup__input_role_image-title"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={(e) =>
            handleChange(e, updateName, updateNameInputValidity, updateNameErrorMessage)
          }
        />
        <span
          className={`popup__input-error popup__input-error_place ${
            !isNameInputValid && 'popup__input-error_active'
          }`}
        >
          {nameErrorMessage}
        </span>
        <input
          type="url"
          id="url"
          name="link"
          placeholder="Image link"
          className="popup__input popup__input_role_image-link"
          value={link}
          onChange={(e) =>
            handleChange(e, updateLink, updateLinkInputValidity, updateLinkErrorMessage)
          }
          required
        />
        <span
          className={`popup__input-error popup__input-error_url ${
            !isLinkInputValid && 'popup__input-error_active'
          }`}
        >
          {linkErrorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
