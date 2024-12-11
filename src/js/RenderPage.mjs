import ExternalServices from './ExternalServices.mjs';
import { loadTemplate, qs, renderWithTemplate, getCYear } from './utils.mjs';

export default class RenderPage {
  constructor(parentSelector) {
    if (new.target === RenderPage) {
      throw new Error('Cannot instantiate RenderPage class.');
    }

    this.parent = qs(parentSelector);
    this.dataSource = new ExternalServices();
  }

  async init(isDynamic = false, title = '') {
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

    renderWithTemplate(headerTemplate, headerElement);
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
}
