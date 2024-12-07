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
    const startDate = new Date('1900');
    const endDate = new Date();

    const res = await fetch(
      `${VITE_TMDB_URL}/3/discover/movie?api_key=${VITE_TMDB_KEY}&with_genres=${genreID}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=primary_release_date.desc`
    );
    const { results } = await convertToJSON(res);

    return results;
  }
}
