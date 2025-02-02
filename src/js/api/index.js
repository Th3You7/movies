// src/js/data/movies.js
const API_KEY = '934bbf0163859d206a4d268086d1b2b4';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = {
  trending: async () => {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return await response.json();
  },

  search: async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    return await response.json();
  },

  byGenre: async (genreId) => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    );
    return await response.json();
  },

  getGenres: async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return await response.json();
  },
};
