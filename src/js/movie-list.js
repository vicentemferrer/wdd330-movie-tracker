import { loadHeaderFooter, getParams } from './utils.mjs';
import MovieList from './MovieList.mjs';

const genreID = getParams('genre');

const movieList = new MovieList('#list article', genreID);

movieList.init(loadHeaderFooter);
