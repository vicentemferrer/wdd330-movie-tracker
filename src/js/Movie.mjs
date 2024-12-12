import RenderContent from './RenderContent.mjs';
import { qs, renderWithTemplate, setPageTitle } from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieTemplate(movie, inWatchlist, inFavorite) {
  const addToWatchlistSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512">
      <path d="M17,11H13V7a1,1,0,0,0-2,0v4H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V13h4a1,1,0,0,0,0-2Z"/>
    </svg>
  `;

  const inWatchlistSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 465.822 465.822" style="enable-background:new 0 0 465.822 465.822;" xml:space="preserve" width="512" height="512">
      <g>
        <path d="M5.988,289.981l88.875,88.875c24.992,24.984,65.504,24.984,90.496,0l274.475-274.475c8.185-8.475,7.95-21.98-0.525-30.165   c-8.267-7.985-21.374-7.985-29.641,0L155.194,348.691c-8.331,8.328-21.835,8.328-30.165,0l-88.875-88.875   c-8.475-8.185-21.98-7.95-30.165,0.525C-1.996,268.608-1.996,281.714,5.988,289.981L5.988,289.981z"/>
      </g>
    </svg>
  `;

  const removeFromWatchlistSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" class="rmv" viewBox="0 0 24 24" width="512" height="512">
      <path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"/>
    </svg>
  `;

  const markAsFavorite = `
    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="512" height="512">
      <path d="M17.25,1.851A6.568,6.568,0,0,0,12,4.558,6.568,6.568,0,0,0,6.75,1.851,7.035,7.035,0,0,0,0,9.126c0,4.552,4.674,9.425,8.6,12.712a5.29,5.29,0,0,0,6.809,0c3.922-3.287,8.6-8.16,8.6-12.712A7.035,7.035,0,0,0,17.25,1.851ZM13.477,19.539a2.294,2.294,0,0,1-2.955,0C5.742,15.531,3,11.736,3,9.126A4.043,4.043,0,0,1,6.75,4.851,4.043,4.043,0,0,1,10.5,9.126a1.5,1.5,0,0,0,3,0,4.043,4.043,0,0,1,3.75-4.275A4.043,4.043,0,0,1,21,9.126C21,11.736,18.258,15.531,13.477,19.539Z"/>
    </svg>
  `;

  const isFavoriteSVG = `
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
        <button type="button" title="${inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}" ${inWatchlist ? 'class="added"' : ''} id="btnWatchlist">${inWatchlist ? inWatchlistSVG : addToWatchlistSVG}${removeFromWatchlistSVG}</button>
        <button type="button" title="${inFavorite ? 'Remove from favorites' : 'Mark as favorite'}" ${inFavorite ? 'class="added fav"' : ''} id="btnFavorite">${inFavorite ? isFavoriteSVG : markAsFavorite}</button>
      </figcaption>
    </figure>
    <article>
      <h3>Synopsis</h3>
      <p>${movie.overview}</p>
    </article>
  `;

  return template;
}

function watchlistManager(e) {
  if (e.currentTarget.classList.contains('added')) {
    this.store.removeFromWatchlist(this.movieID);
  } else {
    this.store.addToWatchlist(this.movie);
  }
  this.init({ isDynamic: true, reset: true });
}

function favoriteManager(e) {
  if (e.currentTarget.classList.contains('added')) {
    this.store.quitFromFavorite(this.movieID);
  } else {
    this.store.markAsFavorite(this.movie);
  }
  this.init({ isDynamic: true, reset: true });
}

export default class Movie extends RenderContent {
  constructor(parentSelector, movieID) {
    super(parentSelector);
    this.movieID = movieID;
  }

  async load() {
    this.movie = await this.dataSource.getMovie(this.movieID);
  }

  async render() {
    renderWithTemplate(
      movieTemplate(
        this.movie,
        this.store.inWatchlist(this.movieID),
        this.store.isFavorite(this.movieID)
      ),
      this.parent,
      'beforeend'
    );

    qs('#btnWatchlist').addEventListener('click', watchlistManager.bind(this));
    qs('#btnFavorite').addEventListener('click', favoriteManager.bind(this));
  }

  renderTitle() {
    setPageTitle(this.movie.title);
  }

  reset() {
    document.body.innerHTML = `
      <header class="divider" id="header"></header>

      <main>
        <section id="movie">
          <h2></h2>
        </section>
      </main>

      <footer id="footer"></footer>
    `;

    this._setParent();
  }
}
