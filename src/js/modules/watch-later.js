import { storage } from '../storage/index.js';
import { renderMovies } from '../utils/dom.js';

export const initWatchLater = () => {
  const watchLater = storage.get('watchLater');

  if (watchLater.length) {
    document.querySelector('.to-watch').style.display = 'block';
    renderMovies(watchLater, '.to-watch');
  } else {
    document.querySelector('.to-watch').style.display = 'none';
  }
};
