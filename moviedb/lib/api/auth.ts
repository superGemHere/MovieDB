const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

const AUTH_ENDPOINTS = {
  REQUEST_TOKEN: `${TMDB_API_BASE_URL}/authentication/token/new`,
  VALIDATE_WITH_LOGIN: `${TMDB_API_BASE_URL}/authentication/token/validate_with_login`,
  CREATE_SESSION: `${TMDB_API_BASE_URL}/authentication/session/new`,
  DELETE_SESSION: `${TMDB_API_BASE_URL}/authentication/session`,
}

const USER_ENDPOINTS = {
  ACCOUNT_DETAILS: `${TMDB_API_BASE_URL}/account`,
}

// Helper function to add API key to URL
const addApiKey = (url: string) => {
  return `${url}?api_key=${API_KEY}`
}

// Helper function for API requests
const fetchFromTMDB = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching from TMDB:", error)
    throw error
  }
}

// Authentication functions
export const tmdbAuth = {
  // Step 1: Create a new request token
  createRequestToken: async () => {
    const url = addApiKey(AUTH_ENDPOINTS.REQUEST_TOKEN)
    const data = await fetchFromTMDB(url)
    return data.request_token
  },

  // Step 2: Validate the request token with login credentials
  validateRequestToken: async (requestToken: string, username: string, password: string) => {
    const url = addApiKey(AUTH_ENDPOINTS.VALIDATE_WITH_LOGIN)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        request_token: requestToken,
      }),
    }
    const data = await fetchFromTMDB(url, options)
    return data.request_token
  },

  // Step 3: Create a session ID with the validated request token
  createSession: async (requestToken: string) => {
    const url = addApiKey(AUTH_ENDPOINTS.CREATE_SESSION)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request_token: requestToken,
      }),
    }
    const data = await fetchFromTMDB(url, options)
    return data.session_id
  },

  // Step 4: Delete the session when logging out
  deleteSession: async (sessionId: string) => {
    const url = addApiKey(AUTH_ENDPOINTS.DELETE_SESSION)
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    }
    return await fetchFromTMDB(url, options)
  },

  // Get the authentication URL for redirecting the user
  getAuthenticationUrl: (requestToken: string) => {
    return `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(window.location.origin + "/login/approved")}`
  },
}

// User functions
export const tmdbUser = {
  getAccountDetails: async (sessionId: string) => {
    const url = `${addApiKey(USER_ENDPOINTS.ACCOUNT_DETAILS)}&session_id=${sessionId}`
    return await fetchFromTMDB(url)
  },
}


// Image functions
export const tmdbImages = {
  getPosterUrl: (path: string, size = "w500") => {
    if (!path) return null
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  },

  getBackdropUrl: (path: string, size = "original") => {
    if (!path) return null
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  },

  getProfileUrl: (path: string, size = "w185") => {
    if (!path) return null
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
  },
}

