import { getParams } from './utils.mjs';
import MovieList from './MovieList.mjs';

const genreID = getParams('genre');
const title = getParams('name');

const movieList = new MovieList('#list article', genreID);

movieList.init(true, title);
