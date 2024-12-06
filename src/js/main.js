import GenreList from './GenreList.mjs';
import ExternalServices from './ExternalServices.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ExternalServices();
const genreList = new GenreList('#list article', dataSource);

genreList.init(loadHeaderFooter);
