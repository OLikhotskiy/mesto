export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
    }
  //метод открытия попапа
    open() {
      this._popup.classList.add('popup_is-open');
      document.addEventListener('keyup', this._handleEscClose);
    };
  //метод закрытия попапа
    close() {
      this._popupclassList.remove('popup_is-open');
      document.removeEventListener('keyup', this._handleEscClose);
    };
  //метод закрытия по эскейпу  
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
          this.close();
        }
    };
    //метод клика по крестику и оверлею
    setEventListeners() {
      this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_is-open')) {
          this.close();
        }
        if (!evt.target.closest('.popup__overlay')) {
          this.close();
        }
      });
    }
  }
  