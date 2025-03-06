import { TrendingUp, Star, Clock } from "lucide-react"
import { movies } from "@/data/movies"
import MovieCard from "@/components/movie-card"
import styles from "./page.module.css"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  // Get category title and icon
  let categoryTitle = ""
  let CategoryIcon = TrendingUp

  switch (slug) {
    case "trending":
      categoryTitle = "Trending Movies"
      CategoryIcon = TrendingUp
      break
    case "top-rated":
      categoryTitle = "Top Rated Movies"
      CategoryIcon = Star
      break
    case "coming-soon":
      categoryTitle = "Coming Soon"
      CategoryIcon = Clock
      break
    default:
      // For genre categories, capitalize the first letter
      categoryTitle = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Movies`
  }

  // Filter movies based on category
  let categoryMovies = []

  switch (slug) {
    case "trending":
      categoryMovies = [...movies]
      break
    case "top-rated":
      categoryMovies = [...movies].sort((a, b) => b.rating - a.rating)
      break
    case "coming-soon":
      categoryMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 8)
      break
    default:
      // For genre categories
      categoryMovies = movies.filter((movie) =>
        movie.genres.some((genre) => genre.toLowerCase() === slug.toLowerCase()),
      )
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <CategoryIcon className={styles.categoryIcon} />
          <h1 className={styles.title}>{categoryTitle}</h1>
        </div>

        <div className={styles.stats}>
          <span>{categoryMovies.length} movies</span>
        </div>
      </div>

      {categoryMovies.length > 0 ? (
        <div className={styles.movieGrid}>
          {categoryMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No movies found</h2>
          <p>We couldn't find any movies in this category.</p>
        </div>
      )}
    </main>
  )
}

