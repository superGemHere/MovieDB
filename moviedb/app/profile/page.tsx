"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Edit, LogOut, Settings, Star, Clock, Bookmark, Heart, Film } from "lucide-react"
import styles from "./page.module.css"
import MovieCard from "@/components/movie-card"
import { movies } from "@/data/movies"
import { tmdbAuth } from "@/lib/api/auth"
import type { User } from "@/types/user"
import type { WatchlistMovie } from "@/types/movie"
import movieAPI from "@/lib/api/movies"
import { useProtectedRoute } from "@/hooks/useProtectedRoute"
import { useAuth } from "@/context/authContext"

export default function ProfilePage() {

  useProtectedRoute();

  const [activeTab, setActiveTab] = useState("watchlist")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [watchlistMovies, setWatchlistMovies] = useState<WatchlistMovie[]>([])
  const router = useRouter()
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const loggedIn = isAuthenticated
    setIsLoggedIn(loggedIn)

  }, [router])

  useEffect(() => {
    const fetchWatchlist = async () => {
      const user: User | null = localStorage.getItem("moviedb_user") ? JSON.parse(localStorage.getItem("moviedb_user")!) : null
      setUser(user)
      const sessionId = localStorage.getItem("moviedb_session_id")
      setSessionId(sessionId)
      if(sessionId && user) {
        const watchlistResponse = await movieAPI.getWatchlist(user.id, sessionId, 1)
        console.log("watchlist response", watchlistResponse)
        if ('results' in watchlistResponse) {
          setWatchlistMovies(watchlistResponse.results)
        }
      }
    }
    fetchWatchlist()
  }, [])

  const handleLogout = () => {
    logout()
  }

  if (!isLoggedIn) {
    return null 
  }


  const favoritesMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 4)
  const reviewedMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 3)

  return (
    <main className={styles.main}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            {user && (
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={120}
                height={120}
                className={styles.avatar}
              />
            )}
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user && user.name}</h1>
            <div className={styles.userStats}>
              {/* <div className={styles.statItem}>
                <span className={styles.statValue}>{user && user.reviews}</span>
                <span className={styles.statLabel}>Reviews</span>
              </div> */}
              <div className={styles.statItem}>
                <span className={styles.statValue}>{watchlistMovies.length}</span>
                <span className={styles.statLabel}>Watchlist</span>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            <button className={styles.actionButton} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "watchlist" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("watchlist")}
          >
            <Bookmark size={18} />
            <span>Watchlist</span>
          </button>
          {/* <button
            className={`${styles.tab} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={18} />
            <span>Reviews</span>
          </button> */}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "watchlist" && (
            <div className={styles.movieGrid}>
              {watchlistMovies.length > 0 ? (
                watchlistMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
              ) : (
                <div className={styles.emptyState}>
                  <Film size={48} className={styles.emptyIcon} />
                  <h3>Your watchlist is empty</h3>
                  <p>Movies you want to watch will appear here</p>
                  <Link href="/" className={styles.browseButton}>
                    Browse Movies
                  </Link>
                </div>
              )}
            </div>
          )}
          {/* {activeTab === "reviews" && (
            <div className={styles.reviewsContainer}>
              {reviewedMovies.length > 0 ? (
                reviewedMovies.map((movie) => (
                  <div key={movie.id} className={styles.reviewItem}>
                    <div className={styles.reviewMovie}>
                      <Image
                        src={movie.poster_path || "/placeholder.svg"}
                        alt={movie.title}
                        width={80}
                        height={120}
                        className={styles.reviewPoster}
                      />
                      <div className={styles.reviewMovieInfo}>
                        <h3>{movie.title}</h3>
                        <div className={styles.reviewRating}>
                          <Star className={styles.reviewStar} size={16} fill="#f5c518" />
                          <span>{(Math.random() * 2 + 3).toFixed(1)}/5</span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewText}>
                      {`${movie.title} is ${Math.random() > 0.5 ? "an amazing" : "a fantastic"} movie. The ${Math.random() > 0.5 ? "acting" : "cinematography"} was outstanding and I would definitely recommend it to anyone who enjoys ${movie.genres[0]} films.`}
                    </p>
                    <div className={styles.reviewDate}>
                      Reviewed on {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Star size={48} className={styles.emptyIcon} />
                  <h3>No reviews yet</h3>
                  <p>Movies you've reviewed will appear here</p>
                  <Link href="/" className={styles.browseButton}>
                    Browse Movies
                  </Link>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </main>
  )
}

