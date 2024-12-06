import { qs, renderListWithTemplate, setPageTitle } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieCardTemplate(movie) {
  const cardTemplate = qs('#movie-card-template');
  const width = 'w300';

  const clone = cardTemplate.content.cloneNode(true);

  const movieAnchor = qs('a', clone);
  const movieIMG = qs('img', clone);
  const movieH4 = qs('h4', clone);
  const moviePara = qs('p', clone);

  movieAnchor.setAttribute('href', `../movie/?id=${movie.id}`);
  movieIMG.setAttribute(
    'src',
    `${VITE_TMDB_IMG}/${width}${movie['poster_path']}`
  );
  movieIMG.setAttribute('alt', `${movie.title} poster`);
  movieH4.textContent = movie.title;
  moviePara.textContent = new Date(movie['release_date']).getFullYear();

  return clone;
}

export default class MovieList {
  constructor(parentSelector, genreID) {
    this.parent = qs(parentSelector);
    this.genreID = genreID;
    this.dataSource = new ExternalServices();
  }

  async init(initCb = () => {}, endCb = () => {}) {
    initCb();
    setPageTitle('name');

    const list = await this.dataSource.getMovieList(this.genreID);

    renderListWithTemplate(movieCardTemplate, this.parent, list);

    endCb();
  }
}
