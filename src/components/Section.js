export class Section {
  constructor(
    //items,
    renderer,

    selectorContainer
  ) {
    //(this._items = items),
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
