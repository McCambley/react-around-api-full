import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info-box">
          <div className="profile__avatar-wrapper">
            <img
              id="avatar"
              src={currentUser.avatar}
              alt="Current user portrait"
              className={`profile__avatar ${props.isLoading ? 'shimmer' : ''}`}
            />
            <div onClick={props.onEditAvatarClick} className="profile__avatar-overlay"></div>
          </div>
          <div className="profile__text">
            <div className="profile__text-top">
              <h1 className={`profile__name ${props.isLoading ? 'shimmer' : ''}`}>
                {currentUser.name}
              </h1>
              <button
                onClick={props.onEditProfileClick}
                type="button"
                name="Edit profile"
                className={`profile__edit-button ${props.isLoading ? 'hide' : ''}`}
                aria-label="Edit profile"
              ></button>
            </div>
            <p className={`profile__title ${props.isLoading ? 'shimmer' : ''}`}>
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          type="button"
          name="Add image"
          className={`profile__add-button ${props.isLoading ? 'hide' : ''}`}
          aria-label="Add image"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card, index) => (
          <Card
            onCardLike={props.onCardLike}
            key={card._id}
            onCardDelete={props.onDeletePlaceClick}
            cardData={card}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}
