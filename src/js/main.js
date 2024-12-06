import { loadHeaderFooter } from './utils.mjs';
import GenreList from './GenreList.mjs';

const genreList = new GenreList('#list article');

genreList.init(loadHeaderFooter);
