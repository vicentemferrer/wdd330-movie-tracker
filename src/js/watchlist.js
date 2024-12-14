import Watchlist from './Watchlist.mjs';

const onReset = `
  <header class="divider" id="header"></header>

  <main>
    <section id="watchlist">
      <h2>My Watchlist</h2>
      <ul></ul>
    </section>
  </main>

  <footer id="footer"></footer>
`;

const watchlist = new Watchlist('#watchlist ul', onReset);

watchlist.init();
