import '../scss/main.scss';

import { initSearch } from './modules/search.js';
import { initTrending } from './modules/trendings.js';
import { setupFavorites, initFavorites } from './modules/favorites.js';
import { initWatchLater } from './modules/watch-later.js';

const initApp = async () => {
  try {
    // Initialize features
    initSearch();
    initFavorites();
    initWatchLater();
    await initTrending();
    setupFavorites();
  } catch (error) {
    console.error('App initialization failed:', error);
    // Show error message to user
    document.querySelector('.movies-section__grid').innerHTML = `
      <div class="error">Failed to load movies. Please try again later.</div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', initApp);
