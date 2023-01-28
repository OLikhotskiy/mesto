export class Section {
    constructor({ initialCards, renderer}, containerSelector) {
      this._initialCards = initialCards;//массив данных
      this._renderer = renderer; // функция создания и отрисовки данных на странице
      this._elementsContainer = document.querySelector(containerSelector); //контейнер
    }
  
    //метод, который отрисовывает все элементы на странице через функцию рендерер
    renderElements() {
      this._initialCards.forEach((item) => {
        this._renderer(item);
      });
    }
  //метод, который принимает ДОМ элемент и добовляет его в контейнер
    addItem(element) {
      this._elementsContainer.prepend(element);
    }
  }