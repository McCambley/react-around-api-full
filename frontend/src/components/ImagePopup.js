export default function ImagePopup(props) {
  return (
    <div className={`popup popup_role_image ${props.card && 'popup_opened'}`}>
      <div className="popup__container popup__container_role_image">
        <figure className="popup__figure">
          <img src={`${props.card ? props.card.link : '#'}`} alt="#" className="popup__image" />
          <figcaption className="popup__caption">{`${props.card && props.card.name}`}</figcaption>
        </figure>
        <button type="button" className="popup__close popup__close_role_image" aria-label="Close" onClick={props.onClose}></button>
      </div>
    </div>
  );
}
