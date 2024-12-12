import RenderContent from './RenderContent.mjs';
import { qs, genreIconName, renderListWithTemplate } from './utils.mjs';

function genreItemTemplate(genre) {
  const genreTemplate = qs('#genre-template');

  const clone = genreTemplate.content.cloneNode(true);

  const genreAnchor = qs('a', clone);
  const iconIMG = qs('img', clone);
  const textFigCap = qs('h3', clone);

  genreAnchor.setAttribute('href', `movie-list/?genre=${genre.id}&name=${genre.name}`);
  iconIMG.setAttribute('src', `images/genres/${genreIconName(genre.name)}.webp`);
  iconIMG.setAttribute('alt', `${genre.name} icon`);
  textFigCap.textContent = genre.name;

  return clone;
}

export default class GenreList extends RenderContent {
  constructor(parentSelector) {
    super(parentSelector);
  }

  async load() {
    this.list = await this.dataSource.getMovieGenres();
  }

  async render() {
    renderListWithTemplate(genreItemTemplate, this.parent, this.list);
  }
}
