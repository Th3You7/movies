// src/js/utils/dom.js
import { storage } from '../storage/index.js';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w300';

export const renderMovies = (movies, selector) => {
  const container = document.querySelector(`${selector} .movies-section__grid`);
  container.innerHTML = '';

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.insertAdjacentHTML('beforeend', card);
  });
};
// export const renderTrendingSection = (genre, movies) => {
//   const trendingContainer = document.querySelector('.movies-section > .container');

//   // Create section element
//   const section = document.createElement('section');
//   section.className = 'trending-genre';

//   // Create heading
//   const heading = document.createElement('h3');
//   heading.className = 'trending-genre__title';
//   heading.textContent = `Top 10 ${genre} Movies`;

//   // Create movies grid
//   const grid = document.createElement('div');
//   grid.className = 'movies-section__grid trending-genre__grid';

//   // Create movie cards
//   movies.forEach((movie) => {
//     const card = createMovieCard(movie);
//     grid.appendChild(card);
//   });

//   // Assemble section
//   section.appendChild(heading);
//   section.appendChild(grid);
//   trendingContainer.appendChild(section);
// };

const createMovieCard = (movie) => {
  const { id, title, genre_ids, poster_path, vote_average, release_date } = movie;

  // Get storage status
  const isFavorite = storage.get('favorites').some(({ id }) => id === movie.id);
  const isWatchLater = storage.get('watchLater').some(({ id }) => id === movie.id);

  return `
  <article class="movie-card">
    <img src="${POSTER_BASE_URL}${movie.poster_path}"
         alt="${movie.title}" 
         class="movie-card__image"
         >
    
    <h3 class="movie-card__title">${movie.title}</h3>
    
    <div class="movie-card__details">
      <span class="movie-card__rating">
        <i class="movie-card__star fas fa-star"></i> ${movie.vote_average?.toFixed(1) || 'N/A'}
      </span>
      <span class="movie-card__separator">|</span>
      <span class="movie-card__year">
        ${movie.release_date?.split('-')[0] || 'N/A'}
      </span>
    </div>
    
    <div class="movie-card__actions">
      <button data-action="favorite" 
              data-movie-id="${movie.id}"
              data-movie='${JSON.stringify({ id, title, genre_ids, poster_path, vote_average, release_date })}'
              class="movie-card__btn ${isFavorite ? 'movie-card__btn--active' : ''}"
              aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
        ${isFavorite ? '❤️' : '🤍'}
      </button>
      <button data-action="watchLater" 
              data-movie-id="${movie.id}"
              data-movie='${JSON.stringify({ id, title, genre_ids, poster_path, vote_average, release_date })}'
              class="movie-card__btn ${isWatchLater ? 'movie-card__btn--active' : ''}"
              aria-label="${isWatchLater ? 'Remove from watch later' : 'Add to watch later'}">
        ${isWatchLater ? '✅' : '➕'}
      </button>
    </div>
    </article>
  `;
};
