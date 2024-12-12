import RenderContent from './RenderContent.mjs';
import InteractionButton from './components/InteractionButton.mjs';
import {
  addToWatchlistSVG,
  inWatchlistSVG,
  removeFromWatchlistSVG,
  markAsFavoriteSVG,
  isFavoriteSVG
} from './components/SVGs.mjs';
import { watchlistManager, favoriteManager } from './interactions.mjs';
import { qsAll, renderListWithTextTemplate } from './utils.mjs';

const { VITE_TMDB_IMG } = import.meta.env;

function movieWatchlistCard(movie) {
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
    <li>
      <img src="${VITE_TMDB_IMG}/w300${movie['poster_path']}" alt="${movie.title} poster" loading="lazy">
      <div>
        <h4>${movie.title}</h4>
        <p>
          ${InteractionButton(wlIntOpt).outerHTML}
          ${InteractionButton(fvIntOpt).outerHTML}
        </p>
      </div>
    </li>
  `;

  return template;
}

export default class Watchlist extends RenderContent {
  constructor(parentSelector) {
    super(parentSelector);
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

    Array.from(qsAll('.btnWatchlist')).forEach((button) => {
      button.addEventListener('click', watchlistManager.bind(this));
    });

    Array.from(qsAll('.btnFavorite')).forEach((button) => {
      button.addEventListener('click', favoriteManager.bind(this));
    });
  }
}
