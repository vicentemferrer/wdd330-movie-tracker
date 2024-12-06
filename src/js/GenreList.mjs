import { qs, genreIconName, renderListWithTemplate } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

function genreItemTemplate(genre) {
  const genreTemplate = qs('#genre-template');

  const clone = genreTemplate.content.cloneNode(true);

  const genreAnchor = qs('a', clone);
  const iconIMG = qs('img', clone);
  const textFigCap = qs('h3', clone);

  genreAnchor.setAttribute(
    'href',
    `movie-list/?genre=${genre.id}&name=${genre.name}`
  );
  iconIMG.setAttribute(
    'src',
    `images/genres/${genreIconName(genre.name)}.webp`
  );
  iconIMG.setAttribute('alt', `${genre.name} icon`);
  textFigCap.textContent = genre.name;

  return clone;
}

export default class GenreList {
  constructor(parentSelector) {
    this.parent = qs(parentSelector);
    this.dataSource = new ExternalServices();
  }

  async init(initCb = () => {}, endCb = () => {}) {
    initCb();

    const list = await this.dataSource.getMovieGenres();

    renderListWithTemplate(genreItemTemplate, this.parent, list);

    endCb();
  }
}
