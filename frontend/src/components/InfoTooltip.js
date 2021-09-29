import React from 'react';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

export default function InfoTooltip({ isOpen, onClose, isSuccess, action }) {
  return (
    <div className={`popup popup_role_tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_role_success ">
        <img src={isSuccess ? successImage : failImage} alt="success" className="popup__success" />
        <p className="popup__message">
          {isSuccess
            ? `Success! You have now been ${action}.`
            : `Oops, something went wrong! Please try again.`}
        </p>
        <button
          type="button"
          className={`popup__close popup__close_role_tooltip`}
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
