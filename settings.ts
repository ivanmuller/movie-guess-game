const settings = {
  appTitle: 'Movie Guess Game',
  movieDbApiKey: process.env.MOVIE_API_KEY,
  md5addition: '__additionalCharacters&$?',
  urls: {
    getMovie: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${settings.movieDbApiKey}`,
    getImages: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${settings.movieDbApiKey}&include_image_language=null`,
    getMovieset1: (pageNumber) => `https://api.themoviedb.org/3/discover/movie?api_key=${settings.movieDbApiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${pageNumber}&primary_release_date.gte=1980-01-01&primary_release_date.lte=2022-05-30&with_release_type=1&vote_count.gte=1000&vote_average.gte=7&with_original_language=en`,
    searchMovies: (inputValue) => `https://api.themoviedb.org/3/search/movie?api_key=${settings.movieDbApiKey}&language=en-US&query=${inputValue}&page=1&include_adult=false`,
    imageBaseBackdrop: (imgFile, width = 1280) => `https://image.tmdb.org/t/p/w${width}${imgFile}`
  },
  consoleLogStyles: ['font-size: 14px', 'font-family: monospace', 'background: white', 'display: block', 'color: black', 'padding: 12px 24px', 'border: 1px dashed;'],
  time: 20,
  timeSkip: 10,
  lifes: 3,
  delayBetweenMovies: 1200
}

export default settings
