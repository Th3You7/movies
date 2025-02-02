// src/js/modules/search.js
import { fetchMovies } from '../api/index.js';
import { renderMovies } from '../utils/dom.js';
import { debounce } from '../helpers/debouce.js';
import { initFavorites } from './favorites.js';
import { initWatchLater } from './watch-later.js';
import { initTrending } from './trendings.js';

export const initSearch = () => {
  const searchInput = document.querySelector('#search-input');

  const handleSearch = debounce(async (query) => {
    console.log(query);
    if (query.length < 3) {
      document.querySelector('.cards').style.display = 'block';

      initFavorites();
      initWatchLater();
      initTrending();
      return;
    }
    try {
      const { results } = await fetchMovies.search(query);
      // hide all sections except search
      document.querySelectorAll('.movies-section').forEach((e) => {
        e.style.display = 'none';
      });
      document.querySelector('.cards').style.display = 'none';
      document.querySelector('.search').style.display = 'block';
      renderMovies(results, '.search');
    } catch (error) {
      console.error('Search failed:', error);
      initFavorites();
      initWatchLater();
      initTrending();
    }
  }, 500);

  searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
};
