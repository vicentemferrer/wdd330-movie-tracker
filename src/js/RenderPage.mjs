import ExternalServices from './ExternalServices.mjs';
import MovieStorageManager from './MovieStorageManager.mjs';
import { loadTemplate, qs, renderWithTemplate, getCYear } from './utils.mjs';

export default class RenderPage {
  constructor(parentSelector) {
    if (new.target === RenderPage) {
      throw new Error('Cannot instantiate RenderPage class.');
    }

    this._setParent = this._setParent.bind(this, parentSelector);
    this.parent = qs(parentSelector);
    this.dataSource = new ExternalServices();
    this.store = new MovieStorageManager('my-watchlist', 'fav-movies');
  }

  async init({ isDynamic = false, reset = false, title = '' } = {}) {
    if (reset) this.reset();
    this.loadHeaderFooter();
    await this.load();
    if (isDynamic) this.renderTitle(title);
    this.render();
  }

  async loadHeaderFooter() {
    const headerTemplate = await loadTemplate('../partials/header.html');
    const headerElement = qs('#header');
    const footerTemplate = await loadTemplate('../partials/footer.html');
    const footerElement = qs('#footer');

    renderWithTemplate(
      headerTemplate,
      headerElement,
      'afterbegin',
      this.setWatchlistCounter.bind(this)
    );
    renderWithTemplate(footerTemplate, footerElement);

    getCYear('#c-year');
  }

  async load() {
    throw new Error('load() must be implemented.');
  }

  async render() {
    throw new Error('render() must be implemented.');
  }

  renderTitle(title) {
    console.log(title);
    throw new Error('renderTitle() must be implemented.');
  }

  reset() {
    throw new Error('reset() must be implemented.');
  }

  _setParent(selector) {
    this.parent = qs(selector);
  }

  setWatchlistCounter() {
    const counter = qs('.wl span');

    const qty = this.store.getWatchlistQuantity();

    if (!this.store.checkVoidStorage('my-watchlist')) {
      counter.classList.remove('hide');
      counter.textContent = qty;
    } else {
      counter.classList.add('hide');
    }
  }
}
