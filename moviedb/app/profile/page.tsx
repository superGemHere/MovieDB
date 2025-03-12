"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Edit, LogOut, Settings, Star, Clock, Bookmark, Heart, Film } from "lucide-react"
import styles from "./page.module.css"
import MovieCard from "@/components/movie-card"
import { movies } from "@/data/movies"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("watchlist")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    if (!loggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  // Mock data for user profile
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=200&width=200",
    joinDate: "January 2023",
    watchedMovies: 42,
    reviews: 15,
  }

  // Get random movies for each tab
  const watchlistMovies = movies.slice(0, 4)
  const favoritesMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 4)
  const reviewedMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 3)

  return (
    <main className={styles.main}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarContainer}>
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={120}
              height={120}
              className={styles.avatar}
            />
            <button className={styles.editAvatar}>
              <Edit size={16} />
            </button>
          </div>

          <div className={styles.userInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>{user.email}</p>
            <div className={styles.userStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{user.watchedMovies}</span>
                <span className={styles.statLabel}>Watched</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{user.reviews}</span>
                <span className={styles.statLabel}>Reviews</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{watchlistMovies.length}</span>
                <span className={styles.statLabel}>Watchlist</span>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            <button className={styles.actionButton}>
              <Settings size={18} />
              <span>Settings</span>
            </button>
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
          <button
            className={`${styles.tab} ${activeTab === "favorites" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart size={18} />
            <span>Favorites</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={18} />
            <span>Reviews</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === "history" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <Clock size={18} />
            <span>History</span>
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "watchlist" && (
            <div className={styles.movieGrid}>
              {/* {watchlistMovies.length > 0 ? (
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
              )} */}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className={styles.movieGrid}>
              {/* {favoritesMovies.length > 0 ? (
                favoritesMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
              ) : (
                <div className={styles.emptyState}>
                  <Heart size={48} className={styles.emptyIcon} />
                  <h3>No favorite movies yet</h3>
                  <p>Movies you love will appear here</p>
                  <Link href="/" className={styles.browseButton}>
                    Browse Movies
                  </Link>
                </div>
              )} */}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.reviewsContainer}>
              {/* {reviewedMovies.length > 0 ? (
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
              )} */}
            </div>
          )}

          {activeTab === "history" && (
            <div className={styles.historyContainer}>
              {/* {movies.slice(0, 5).map((movie, index) => (
                <div key={movie.id} className={styles.historyItem}>
                  <div className={styles.historyMovie}>
                    <Image
                      src={movie.poster_path || "/placeholder.svg"}
                      alt={movie.title}
                      width={60}
                      height={90}
                      className={styles.historyPoster}
                    />
                    <div className={styles.historyMovieInfo}>
                      <h3>{movie.title}</h3>
                      <p>
                        {movie.release_date} • {movie.runtime} min
                      </p>
                    </div>
                  </div>
                  <div className={styles.historyDate}>
                    Watched {index === 0 ? "Today" : index === 1 ? "Yesterday" : `${index + 2} days ago`}
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

