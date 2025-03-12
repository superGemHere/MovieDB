import { Search } from "lucide-react"
import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import { movies } from "@/data/movies"
import styles from "./page.module.css"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).q || "";

  // Filter movies based on search query
  const searchResults = query
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.overview.toLowerCase().includes(query.toLowerCase()) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase())) ||
          movie.cast.some((actor) => actor.toLowerCase().includes(query.toLowerCase())),
      )
    : []

  return (
    <main className={styles.main}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Search Movies</h1>
        <SearchBar />
      </div>

      {/* {query ? (
        <div className={styles.results}>
          <h2 className={styles.resultsTitle}>
            {searchResults.length > 0
              ? `Found ${searchResults.length} results for "${query}"`
              : `No results found for "${query}"`}
          </h2>

          {searchResults.length > 0 ? (
            <div className={styles.movieGrid}>
              {searchResults.map((movie) => (
                // <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <Search size={48} className={styles.noResultsIcon} />
              <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.trending}>
          <h2 className={styles.trendingTitle}>Popular Searches</h2>
          <div className={styles.movieGrid}>
            {movies.slice(0, 12).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )} */}
    </main>
  )
}

