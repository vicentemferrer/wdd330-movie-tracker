import { getLocalStorage, setLocalStorage, simplifyMovie } from './utils.mjs';

export default class MovieStorageManager {
  constructor(watchlistKey, favoritesKey) {
    this.watchlistKey = watchlistKey;
    this.favoritesKey = favoritesKey;
  }

  getWatchlistQuantity() {
    const watchlist = getLocalStorage(this.watchlistKey) || [];

    return watchlist.length;
  }

  getWatchlist() {
    const watchlist = getLocalStorage(this.watchlistKey) || [];

    return watchlist;
  }

  markAsFavorite(movie) {
    const favorites = getLocalStorage(this.favoritesKey) || [];

    favorites.push(simplifyMovie(movie));

    setLocalStorage(this.favoritesKey, favorites);
  }

  quitFromFavorite(id) {
    const favorites = getLocalStorage(this.favoritesKey) || [];

    const updatedFavorites = favorites.filter((movie) => movie.id.toString() !== id);

    setLocalStorage(this.favoritesKey, updatedFavorites);
  }

  isFavorite(id) {
    const favorites = getLocalStorage(this.favoritesKey) || [];

    return favorites.some((movie) => movie.id.toString() === id);
  }

  addToWatchlist(movie) {
    const watchlist = getLocalStorage(this.watchlistKey) || [];

    watchlist.push(simplifyMovie(movie));

    setLocalStorage(this.watchlistKey, watchlist);
  }

  removeFromWatchlist(id) {
    const watchlist = getLocalStorage(this.watchlistKey) || [];

    const updatedWatchlist = watchlist.filter((movie) => movie.id.toString() !== id);

    setLocalStorage(this.watchlistKey, updatedWatchlist);
  }

  inWatchlist(id) {
    const watchlist = getLocalStorage(this.watchlistKey) || [];

    return watchlist.some((movie) => movie.id.toString() === id);
  }

  checkVoidStorage(key) {
    const storage = getLocalStorage(key) || [];

    return storage.length === 0;
  }
}
