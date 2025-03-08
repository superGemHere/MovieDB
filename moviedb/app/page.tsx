import Link from "next/link"
import { TrendingUp, Star, Clock } from "lucide-react"
import MovieCard from "@/components/movie-card"
import SearchBar from "@/components/search-bar"
import styles from "./page.module.css"
import { movies } from "@/data/movies"
import movieAPI from "./lib/api/movies"
import MovieSlider from "@/components/movie-slider"

export default async function Home() {
  // Get trending and top-rated movies
  const trendingMovies = await movieAPI.getTrendingMovies();
  const topRatedMovies = await movieAPI.getTopRatedMovies();
  const comingMovies = await movieAPI.getComingSoonMovies();

  console.log("movies", trendingMovies)

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Amazing Movies</h1>
          <p>Find the latest and greatest films all in one place</p>
          <SearchBar />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <TrendingUp className={styles.sectionIcon} />
          <h2>Trending Now</h2>
          <Link href="/category/trending" className={styles.viewAll}>
            View All
          </Link>
        </div>
        {/* <div className={styles.movieGrid}>
          {trendingMovies.slice(6, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> */}
        <MovieSlider movies={trendingMovies} sectionTitle="Trending Now" />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Star className={styles.sectionIcon} />
          <h2>Top Rated</h2>
          <Link href="/category/top-rated" className={styles.viewAll}>
            View All
          </Link>
        </div>
        {/* <div className={styles.movieGrid}>
          {topRatedMovies.slice(6, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> */}
        <MovieSlider movies={topRatedMovies} sectionTitle="Top Rated" />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Clock className={styles.sectionIcon} />
          <h2>Coming Soon</h2>
          <Link href="/category/coming-soon" className={styles.viewAll}>
            View All
          </Link>
        </div>
        {/* <div className={styles.movieGrid}>
          {comingMovies.slice(6, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div> */}
        <MovieSlider movies={comingMovies} sectionTitle="Coming Soon" />
      </section>
    </main>
  )
}

