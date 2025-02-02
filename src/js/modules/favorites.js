import { storage } from '../storage/index.js';
import { renderMovies } from '../utils/dom.js';

export const setupFavorites = () => {
  const favoriteBtn = document.querySelectorAll('[data-action="favorite"]');
  const watchLaterBtn = document.querySelectorAll('[data-action="watchLater"]');

  const handleFavoriteClick = (movie) => {
    const favorites = storage.get('favorites');
    favorites.some((elem) => elem.id === movie.id)
      ? storage.removeItem('favorites', movie)
      : storage.addItem('favorites', movie);
  };

  const handleWatchLaterClick = (movie) => {
    const watchLater = storage.get('watchLater');
    watchLater.some((elem) => elem.id === movie.id)
      ? storage.removeItem('watchLater', movie)
      : storage.addItem('watchLater', movie);
  };

  // Events

  favoriteBtn.forEach((elem) =>
    elem.addEventListener('click', () => handleFavoriteClick(JSON.parse(elem.dataset.movie)))
  );
  watchLaterBtn.forEach((elem) =>
    elem.addEventListener('click', () => handleWatchLaterClick(JSON.parse(elem.dataset.movie)))
  );
};

export const initFavorites = () => {
  const favorites = storage.get('favorites');
  // if there are stored movies display em
  if (favorites.length) {
    document.querySelector('.favorite').style.display = 'block';
    renderMovies(favorites, '.favorite');
  } else {
    document.querySelector('.favorite').style.display = 'none';
  }
};
