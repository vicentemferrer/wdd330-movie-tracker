const { VITE_TMDB_API_KEY } = import.meta.env;

const { genres } = await fetch(
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${VITE_TMDB_API_KEY}`
).then((res) => res.json());

console.log(genres);
