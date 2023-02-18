export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    (this._name = document.querySelector(nameSelector)),
      (this._about = document.querySelector(aboutSelector)),
      (this._avatar = document.querySelector(avatarSelector)),
      (this._userId = null);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(data) {
    (this._name.textContent = data.name),
      (this._about.textContent = data.about),
      (this._avatar.src = data.avatar),
      (this._userId = data._id);
  }
}
