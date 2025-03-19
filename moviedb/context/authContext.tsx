"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { tmdbAuth, tmdbUser, tmdbImages } from "@/lib/api/auth"
import type { User } from "@/types/user"

interface TMDBUser {
  id: number
  name: string
  username: string
  avatar?: {
    gravatar?: {
      hash?: string
    }
    tmdb?: {
      avatar_path?: string
    }
  }
}

interface AuthContextType {
  user: User | null
  sessionId: string | null
  isAuthenticated: boolean,
  setIsAuthenticated: (value: boolean) => void
  isLoading: boolean
  error: string | null
  loginWithTMDB: (username: string, password: string) => Promise<void>
  loginWithToken: (requestToken: string) => Promise<void>
  logout: () => Promise<void>
  createRequestToken: () => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to get stored auth data
const getStoredAuthData = () => {
  if (typeof window === "undefined") return { user: null, sessionId: null }

  const storedUser = localStorage.getItem("moviedb_user")
  const storedSessionId = localStorage.getItem("moviedb_session_id")
  const isLogged = localStorage.getItem("isAuthenticated")

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    sessionId: storedSessionId,
    isLogged
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  

  useEffect(() => {
    const { user, sessionId, isLogged } = getStoredAuthData()
    setUser(user)
    setSessionId(sessionId)
    setIsLoading(false)
    setIsAuthenticated(isLogged === "true")
  }, [])

  const createRequestToken = async (): Promise<string> => {
    try {
      setIsLoading(true)
      setError(null)
      const requestToken = await tmdbAuth.createRequestToken()
      return requestToken
    } catch (err) {
      setError("Failed to create authentication token")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithTMDB = async (username: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const requestToken = await tmdbAuth.createRequestToken()

      const validatedToken = await tmdbAuth.validateRequestToken(requestToken, username, password)

      const newSessionId = await tmdbAuth.createSession(validatedToken)

      await fetchUserData(newSessionId)
      setIsAuthenticated(true)
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithToken = async (requestToken: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const newSessionId = await tmdbAuth.createSession(requestToken)

      await fetchUserData(newSessionId)
      setIsAuthenticated(true)
    } catch (err: any) {
      setError(err.message || "Authentication failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserData = async (newSessionId: string) => {
    try {
      const accountData: TMDBUser = await tmdbUser.getAccountDetails(newSessionId)

      const userData: User = {
        id: accountData.id,
        name: accountData.name || accountData.username,
        username: accountData.username,
        avatar: getAvatarUrl(accountData),
      }

      setUser(userData)
      setSessionId(newSessionId)
      localStorage.setItem("moviedb_user", JSON.stringify(userData))
      localStorage.setItem("moviedb_session_id", newSessionId)
    } catch (err) {
      throw new Error("Failed to fetch user data")
    }
  }

  const getAvatarUrl = (tmdbUser: TMDBUser): string => {
    if (tmdbUser.avatar?.tmdb?.avatar_path) {
      return tmdbImages.getProfileUrl(tmdbUser.avatar.tmdb.avatar_path) || "/placeholder.svg?height=200&width=200"
    }

    if (tmdbUser.avatar?.gravatar?.hash) {
      return `https://www.gravatar.com/avatar/${tmdbUser.avatar.gravatar.hash}?s=200`
    }

    return "/placeholder.svg?height=200&width=200"
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      if (sessionId) {
        await tmdbAuth.deleteSession(sessionId)
      }

      setUser(null)
      setSessionId(null)
      setIsAuthenticated(false)
      localStorage.removeItem("moviedb_user")
      localStorage.removeItem("moviedb_session_id")
      localStorage.removeItem("isAuthenticated")
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionId,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        error,
        loginWithTMDB,
        loginWithToken,
        logout,
        createRequestToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

