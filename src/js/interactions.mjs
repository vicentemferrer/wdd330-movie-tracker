export function watchlistManager(e) {
  if (e.currentTarget.classList.contains('added')) {
    this.store.removeFromWatchlist(this.movieID);
  } else {
    this.store.addToWatchlist(this.movie);
  }
  this.init({ isDynamic: true, reset: true });
}

export function favoriteManager(e) {
  if (e.currentTarget.classList.contains('added')) {
    this.store.quitFromFavorite(this.movieID);
  } else {
    this.store.markAsFavorite(this.movie);
  }
  this.init({ isDynamic: true, reset: true });
}
