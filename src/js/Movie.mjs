import RenderContent from './RenderContent.mjs';
import InteractionButton from './components/InteractionButton.mjs';
import {
  addToWatchlistSVG,
  inWatchlistSVG,
  removeFromWatchlistSVG,
  markAsFavoriteSVG,
  isFavoriteSVG
} from './components/SVGs.mjs';
import { qsAll, renderWithTemplate, setPageTitle } from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieTemplate(movie, inWatchlist, inFavorite) {
  const wlIntOpt = {
    condition: inWatchlist,
    interactionType: 'watchlist',
    priSVG: addToWatchlistSVG,
    altSVG: inWatchlistSVG,
    secSVG: removeFromWatchlistSVG
  };

  const fvIntOpt = {
    condition: inFavorite,
    interactionType: 'favorite',
    priSVG: markAsFavoriteSVG,
    altSVG: isFavoriteSVG,
    classes: ['added', 'fav'],
    titles: ['Remove from', 'Mark as']
  };

  const template = `
    <figure>
      <picture>
        <source media="(min-width: 768px)" srcset="${VITE_TMDB_IMG}/w500${movie['poster_path']}">
        <img src="${VITE_TMDB_IMG}/w300${movie['poster_path']}" alt="${movie.title} poster" loading="lazy">
      </picture>
      <figcaption>
        ${InteractionButton(wlIntOpt).outerHTML}
        ${InteractionButton(fvIntOpt).outerHTML}
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
  constructor(parentSelector, movieID, resetStructure) {
    super(parentSelector);
    this.movieID = movieID;
    this.resetStructure = resetStructure;
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

    Array.from(qsAll('.btnWatchlist')).forEach((button) => {
      button.addEventListener('click', watchlistManager.bind(this));
    });

    Array.from(qsAll('.btnFavorite')).forEach((button) => {
      button.addEventListener('click', favoriteManager.bind(this));
    });
  }

  renderTitle() {
    setPageTitle(this.movie.title);
  }

  reset() {
    document.body.innerHTML = this.resetStructure;

    this._setParent();
  }
}
