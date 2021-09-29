import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function DeletePlacePopup({ isOpen, onClose, onDeletePlace, card, isSubmitting }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="delete"
      title="Are You Sure?"
      buttonLabel={isSubmitting ? 'Deleting...' : 'Yes'}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
