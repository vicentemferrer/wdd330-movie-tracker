import { convertToJSON } from './utils.mjs';

const { VITE_TMDB_KEY, VITE_TMDB_URL } = import.meta.env;

export default class ExternalServices {
  async getMovieGenres() {
    const res = await fetch(
      `${VITE_TMDB_URL}/3/genre/movie/list?api_key=${VITE_TMDB_KEY}`
    );
    const { genres } = await convertToJSON(res);

    return genres;
  }

  async getMovieList(genreID) {
    const res = await fetch(
      `${VITE_TMDB_URL}/3/discover/movie?api_key=${VITE_TMDB_KEY}&with_genres=${genreID}`
    );
    const { results } = await convertToJSON(res);

    return results;
  }
}
