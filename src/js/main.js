import GenreList from './GenreList.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ExternalServices();
const genreList = new GenreList('#genres article', dataSource);

genreList.init(loadHeaderFooter);
