export class Section {
  constructor(renderer, selectorContainer) {
    (this._renderer = renderer),
      (this._container = document.querySelector(selectorContainer));
  }

  renderItems = (initialCardsData) => {
    initialCardsData.forEach((cardData) => {
      this._renderer(cardData);
    });
  };

  addItem = (el) => {
    this._container.append(el);
  };
}
