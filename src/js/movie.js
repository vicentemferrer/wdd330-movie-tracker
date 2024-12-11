import { getParams } from './utils.mjs';
import Movie from './Movie.mjs';

const movieID = getParams('id');

const movie = new Movie('#movie', movieID);

movie.init(true);
