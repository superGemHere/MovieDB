import { TrendingUp, Star, Clock } from "lucide-react";
import MovieCard from "@/components/movie-card";
import styles from "./page.module.css";
import type { Movie } from "@/types/movie";
import movieAPI from "@/lib/api/movies";
import PaginationControls from "./PaginationControls";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const page = (await searchParams).page || "1";
  const pageNumber = parseInt(page, 10) || 1;

  // Get category title and icon
  let categoryTitle = "";
  let CategoryIcon = TrendingUp;

  switch (slug) {
    case "trending":
      categoryTitle = "Trending Movies";
      CategoryIcon = TrendingUp;
      break;
    case "top-rated":
      categoryTitle = "Top Rated Movies";
      CategoryIcon = Star;
      break;
    case "coming-soon":
      categoryTitle = "Coming Soon";
      CategoryIcon = Clock;
      break;
    default:
      // For genre categories, capitalize the first letter
      categoryTitle = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Movies`;
  }

  // Filter movies based on category
  let movies: Movie[] = [];

  switch (slug) {
    case "trending":
      movies = await movieAPI.getTrendingMovies(pageNumber);
      break;
    case "top-rated":
      movies = await movieAPI.getTopRatedMovies(pageNumber);
      break;
    case "coming-soon":
      movies = await movieAPI.getComingSoonMovies(pageNumber);
      break;
    default:
      // For genre categories
      movies = await movieAPI.getMovies(pageNumber);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <CategoryIcon className={styles.categoryIcon} />
          <h1 className={styles.title}>{categoryTitle}</h1>
        </div>

        <div className={styles.stats}>
          <PaginationControls />
          <span>{movies.length} movies</span>
        </div>
      </div>

      {movies.length > 0 ? (
        <div className={styles.movieGrid}>
          {movies.map((movie) => (
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
  );
};

export default CategoryPage;

