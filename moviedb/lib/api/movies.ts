import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const requester = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get Movies
const getMovies = async (page?: number) => {
  try {
    const response = await requester.get("/discover/movie", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Get Single Movie
const getSingleMovie = async (id: number) => {
  try {
    const response = await requester.get(`/movie/${id}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

// Get Trending Movies (Current Week)
const getTrendingMovies = async (page?: number) => {
  try {
    const response = await requester.get("/trending/movie/week", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Get Coming Soon Movies
const getComingSoonMovies = async (page?: number) => {
  try {
    const response = await requester.get("/movie/upcoming", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

// Get Top Rated Movies
const getTopRatedMovies = async (page?: number) => {
  try {
    const response = await requester.get("/movie/top_rated", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    return [];
  }
};

const getSimilarMovies = async (id: number) => {
  try {
    const response = await requester.get(`/movie/${id}/similar`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};

const getMovieCredits = async (id: number) => {
  try {
    const response = await requester.get(`/movie/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return null;
  }
};

const getMovieVideos = async (id: number) => {
  try {
    const response = await requester.get(`/movie/${id}/videos`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return [];
  }
};

const movieAPI = {
  getMovies,
  getSingleMovie,
  getTrendingMovies,
  getComingSoonMovies,
  getTopRatedMovies,
  getSimilarMovies,
  getMovieCredits,
  getMovieVideos
};

export default movieAPI;
