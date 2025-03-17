import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const requester = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to ensure that the page parameter is never 0 or negative number avoiding API errors
requester.interceptors.request.use((config) => {
  if (config.params && config.params.page < 1) {
    config.params.page = 1;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const getMovies = async (page?: number) => {
  try {
    const response = await requester.get("/discover/movie", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

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

const getTrendingMovies = async (page?: number) => {
  try {
    const response = await requester.get("/trending/movie/week", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

const getComingSoonMovies = async (page?: number) => {
  try {
    const response = await requester.get("/movie/upcoming", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

const getTopRatedMovies = async (page?: number) => {
  try {
    const response = await requester.get("/movie/top_rated", {
      params: {
        api_key: apiKey,
        page,
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
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

const getMoviesByGenre = async (genreId: number, page?: number) => {
  try {
    const response = await requester.get("/discover/movie", {
      params: {
        api_key: apiKey,
        with_genres: genreId,
        page,
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error(`Error fetching movies for genre ID ${genreId}:`, error);
    return [];
  }
};

const findMovie = async (query: string, page = 1) => {
  if (!query.trim()) return [];

  try {
    const response = await requester.get("/search/movie", {
      params: {
        api_key: apiKey,
        query,
        page,
      },
    });

    return {
      results: response.data.results,
      totalResults: response.data.total_results,
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error(`Error searching for movies with query "${query}":`, error);
    throw new Error("Failed to fetch search results");
  }
};

const addRemoveWatchlist = async (
  accountId: number,
  sessionId: string,
  movieId: number,
  isWatchlist: boolean
) => {
  try {
    const response = await requester.post(
      `/account/${accountId}/watchlist`, 
      {
        media_type: "movie",
        media_id: movieId,
        watchlist: isWatchlist,
      },
      {
        params: {
          api_key: apiKey,
          session_id: sessionId, 
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error adding to watchlist:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

const getWatchlist = async (accountId: number, sessionId: string, page: number = 1) => {
  try {
    const response = await requester.get(`/account/${accountId}/watchlist/movies`, {
      params: {
        api_key: apiKey,
        session_id: sessionId,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
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

const getGenres = async () => {
  try {
    const response = await requester.get("/genre/movie/list", {
      params: { api_key: apiKey },
    });
    return response.data.genres; 
  } catch (error) {
    console.error("Error fetching genres:", error);
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
  getMoviesByGenre,
  findMovie,
  addRemoveWatchlist,
  getWatchlist,
  getMovieCredits,
  getMovieVideos,
  getGenres,
};

export default movieAPI;
