export const getTrendingMovies = async (page: number = 1, pageSize: number = 20) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY&page=${page}`
  );
  const data = await response.json();
  return {
    results: data.results,
    total_results: data.total_results,
    page: data.page
  };
}; 