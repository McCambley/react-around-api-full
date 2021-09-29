import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSubmitting,
  checkValidity,
}) {
  const [isUrlInputValid, updateUrlInputValidity] = React.useState(true);
  const [errorMessage, updateErrorMessage] = React.useState('');
  const [avatarLink, setAvatarLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  React.useEffect(() => {
    setAvatarLink('');
    updateUrlInputValidity(true);
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="avatar"
      title="Change Profile Picture"
      buttonLabel={isSubmitting ? 'Saving...' : 'Save'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-container popup__input-container_role_avatar">
        <input
          onChange={(evt) => {
            checkValidity(evt, updateUrlInputValidity, updateErrorMessage);
            setAvatarLink(evt.target.value);
          }}
          type="url"
          id="avatar-url"
          name="avatar"
          placeholder="Image link"
          className="popup__input popup__input_role_image-link"
          value={avatarLink}
          required
        />
        <span
          className={`popup__input-error popup__input-error_avatar-url ${
            !isUrlInputValid && 'popup__input-error_active'
          }`}
        >
          {errorMessage}
        </span>
      </div>
    </PopupWithForm>
  );
}
