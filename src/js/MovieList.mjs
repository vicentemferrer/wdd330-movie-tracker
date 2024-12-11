import RenderPage from './RenderPage.mjs';
import {
  qs,
  renderListWithTemplate,
  loadImage,
  setPageTitle
} from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

async function filterMovieList(list, key) {
  const moviePromises = list.map(async (movie) => {
    const width = 'w300';
    const path = `${VITE_TMDB_IMG}/${width}${movie[key]}`;

    try {
      await loadImage(path);
      return movie;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  });

  const movieList = await Promise.allSettled(moviePromises);

  return movieList
    .filter(({ status, value }) => status === 'fulfilled' && value !== null)
    .map((movie) => movie.value);
}

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

export default class MovieList extends RenderPage {
  constructor(parentSelector, genreID) {
    super(parentSelector);
    this.genreID = genreID;
  }

  async load() {
    this.list = await this.dataSource.getMovieList(this.genreID);
  }

  async render() {
    this.#renderList(await filterMovieList(this.list, 'poster_path'));
  }

  renderTitle(title) {
    setPageTitle(title);
  }

  #renderList(list) {
    renderListWithTemplate(movieCardTemplate, this.parent, list);
  }
}
