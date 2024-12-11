import RenderPage from './RenderPage.mjs';
import { renderWithTemplate, setPageTitle } from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieTemplate(movie) {
  const addToWatchlist = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512">
      <path d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z"/>
    </svg>
  `;

  const markAsFavorite = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512">
      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/>
    </svg>
  `;

  const template = `
    <figure>
      <picture>
        <source media="(min-width: 768px)" srcset="${VITE_TMDB_IMG}/w500${movie['poster_path']}">
        <img src="${VITE_TMDB_IMG}/w300${movie['poster_path']}" alt="${movie.original_title} poster">
      </picture>
      <figcaption>
        <button type="button" title="Add to watchlist" id="addToWatchlist">${addToWatchlist}</button>
        <button type="button" title="Mark as favorite" id="markAsFavorite">${markAsFavorite}</button>
      </figcaption>
    </figure>
    <article>
      <h3>Synopsis</h3>
      <p>${movie.overview}</p>
    </article>
  `;

  return template;
}

export default class Movie extends RenderPage {
  constructor(parentSelector, movieID) {
    super(parentSelector);
    this.movieID = movieID;
  }

  async load() {
    this.movie = await this.dataSource.getMovie(this.movieID);
  }

  async render() {
    renderWithTemplate(movieTemplate(this.movie), this.parent, 'beforeend');
  }

  renderTitle() {
    setPageTitle(this.movie.title);
  }
}
