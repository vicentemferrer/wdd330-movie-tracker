import RenderContent from './RenderContent.mjs';
import InteractionButton from './components/InteractionButton.mjs';
import {
  addToWatchlistSVG,
  inWatchlistSVG,
  removeFromWatchlistSVG,
  markAsFavoriteSVG,
  isFavoriteSVG
} from './components/SVGs.mjs';
import { qsAll, renderListWithTextTemplate } from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieWatchlistCard(movie, i) {
  const wlIntOpt = {
    condition: this.store.inWatchlist(movie.id),
    interactionType: 'watchlist',
    priSVG: addToWatchlistSVG,
    altSVG: inWatchlistSVG,
    secSVG: removeFromWatchlistSVG
  };

  const fvIntOpt = {
    condition: this.store.isFavorite(movie.id),
    interactionType: 'favorite',
    priSVG: markAsFavoriteSVG,
    altSVG: isFavoriteSVG,
    classes: ['added', 'fav'],
    titles: ['Remove from', 'Mark as']
  };

  const template = `
    <li data-position="${i}" data-id="${movie.id}" class="movie">
      <img src="${VITE_TMDB_IMG}/w300${movie['poster_path']}" alt="${movie.title} poster" loading="lazy">
      <div>
        <a href="../movie/?id=${movie.id}"><h3>${movie.title}</h3></a>
        <p>
          ${InteractionButton(wlIntOpt).outerHTML}
          ${InteractionButton(fvIntOpt).outerHTML}
        </p>
      </div>
    </li>
  `;

  return template;
}

function renderOnVoid(message) {
  return `
  <p class="void-list">${message}</p>
  `;
}

function removeMovie(e) {
  const li = e.currentTarget.parentElement.parentElement.parentElement;

  this.store.removeFromWatchlist(li.dataset.id);

  this.init({ reset: true });
}

function favoriteManager(e) {
  const li = e.currentTarget.parentElement.parentElement.parentElement;

  if (e.currentTarget.classList.contains('added')) {
    this.store.quitFromFavorite(li.dataset.id);
  } else {
    const moviePosition = parseInt(li.dataset.position);
    this.store.markAsFavorite(this.list[moviePosition]);
  }
  this.init({ reset: true });
}

export default class Watchlist extends RenderContent {
  constructor(parentSelector, resetStructure) {
    super(parentSelector);
    this.resetStructure = resetStructure;
  }

  async load() {
    this.list = this.store.getWatchlist();
  }

  async render() {
    renderListWithTextTemplate(
      movieWatchlistCard.bind(this),
      this.parent,
      this.list,
      'afterbegin',
      true
    );

    if (this.parent.innerHTML === '') {
      this.parent.innerHTML = renderOnVoid('Your watchlist is empty. Time to start a new one!');
    }

    Array.from(qsAll('.btnWatchlist')).forEach((button) => {
      button.addEventListener('click', removeMovie.bind(this));
    });

    Array.from(qsAll('.btnFavorite')).forEach((button) => {
      button.addEventListener('click', favoriteManager.bind(this));
    });
  }

  reset() {
    document.body.innerHTML = this.resetStructure;

    this._setParent();
  }
}
