export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,})
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .catch((err) => console.log(err))
  }

  getUserInfo() {
    return fetch (`${this._baseUrl}/users/me/`, {
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
  }

  setUserInfo(newData) {
    return fetch (`${this._baseUrl}/users/me/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        about: newData.about,
        
      }),
    })
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}. Проверьте путь к изображению`)
    );
  }

  like(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject()));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => (res.ok ? res.json() : Promise.reject()));
  }
}
