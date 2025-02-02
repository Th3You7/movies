// src/js/modules/trending.js
import { fetchMovies } from '../api/index.js';
import { renderMovies } from '../utils/dom.js';

export const initTrending = async () => {
  try {
    const trendingRes = await fetchMovies.trending();
    const trendingMovies = trendingRes.results.slice(0, 10);
    document.querySelector('.trending').style.display = 'block';
    renderMovies(trendingMovies, '.trending');
  } catch (e) {
    console.error(e);
    document.querySelector('.trending').style.display = 'none';
  }
};
