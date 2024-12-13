import { getParams } from './utils.mjs';
import Movie from './Movie.mjs';

const movieID = getParams('id');

const onReset = `
  <header class="divider" id="header"></header>

  <main>
    <section id="movie-details">
      <h2></h2>
    </section>
  </main>

  <footer id="footer"></footer>
`;

const movie = new Movie('#movie-details', movieID, onReset);

movie.init({ isDynamic: true });
