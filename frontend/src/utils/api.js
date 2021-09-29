class Api {
  constructor({ baseUrl, authorization }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._auth = authorization;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`${res.status} error!`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._auth,
      },
    }).then(res => this._checkResponse(res));
  }

  getGroupCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._auth,
      },
    }).then(res => this._checkResponse(res));
  }

  updateProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(res => this._checkResponse(res));
  }

  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: avatar }),
    }).then(res => this._checkResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._auth,
        'Content-Type': 'application/json',
      },
    }).then(res => this._checkResponse(res));
  }
}

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authorization: 'd45050bb-6054-461f-a7d7-f299e145a1f0',
});

export default api;
