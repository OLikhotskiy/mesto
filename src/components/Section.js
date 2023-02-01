export class Section {
  constructor({ items, renderer }, selectorContainer) {
    (this._items = items),
      (this._renderer = renderer),
      (this._container = document.querySelector(selectorContainer));
  }

  renderItems = () => {
    this._items.forEach((card) => {
      this._renderer(card);
    });
  };

  addItem = (card) => {
    this._container.prepend(card);
  };
}
