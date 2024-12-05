import { qs, genreIconName, renderListWithTemplate } from './utils.mjs';

function genreItemTemplate(genre) {
  const genreTemplate = qs('#genre-template');

  const clone = genreTemplate.content.cloneNode(true);

  const genreAnchor = qs('a', clone);
  const iconIMG = qs('img', clone);
  const textFigCap = qs('h3', clone);

  genreAnchor.setAttribute('href', `movie-list/?genre=${genre.id}`);
  iconIMG.setAttribute(
    'src',
    `images/genres/${genreIconName(genre.name)}.webp`
  );
  iconIMG.setAttribute('alt', `${genre.name} icon`);
  textFigCap.textContent = genre.name;

  return clone;
}

export default class GenreList {
  constructor(parentSelector, dataSource) {
    this.parent = qs(parentSelector);
    this.dataSource = dataSource;
  }

  async init(initCb = () => {}, endCb = () => {}) {
    initCb();

    this.list = await this.dataSource.getMovieGenres();

    renderListWithTemplate(genreItemTemplate, this.parent, this.list);

    endCb();
  }
}
