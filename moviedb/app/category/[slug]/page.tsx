import { TrendingUp, Star, Clock, Clapperboard } from "lucide-react";
import MovieCard from "@/components/movie-card";
import styles from "./page.module.css";
import type { Movie } from "@/types/movie";
import movieAPI from "@/lib/api/movies";
import PaginationControls from "../../../components/PaginationControls";
import { Movies } from "@/types/PaginatedMovies";
import BottomPagination from "@/components/BottomPagination";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page: string;
  }>;
}

type Genre = {
  id: number;
  name: string;
}


const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { slug } = await params;
  const page = (await searchParams).page || "1";
  const pageNumber = parseInt(page, 10) || 1;
  let genres: Genre[] = await movieAPI.getGenres();
  let genreId: number | undefined = genres.find((genre: Genre) => genre.name.toLowerCase() === slug)?.id;

  console.log('genres', genres);

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
      CategoryIcon = Clapperboard;
  }

  // Filter movies based on category
  let movies: Movies = { results: [], totalPages: 0, totalResults: 0 };

  switch (slug) {
    case "trending":
      movies = await movieAPI.getTrendingMovies(pageNumber) as Movies;
      break;
    case "top-rated":
      movies = await movieAPI.getTopRatedMovies(pageNumber) as Movies;
      break;
    case "coming-soon":
      movies = await movieAPI.getComingSoonMovies(pageNumber) as Movies;
      break;
    default:
      // For genre categories
      if (genreId !== undefined) {
        movies = await movieAPI.getMoviesByGenre(genreId, pageNumber) as Movies;
      } else {
        console.error(`Genre ID not found for slug: ${slug}`);
      }
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <CategoryIcon className={styles.categoryIcon} />
          <h1 className={styles.title}>{categoryTitle}</h1>
        </div>

        <div className={styles.stats}>
          <PaginationControls pathName="category" maxPageCount={movies.totalPages}/>
          <span>
            {movies.totalPages} {`${movies.totalPages === 1 ? "Page" : "Pages"}`}
          </span>
        </div>
      </div>

      {movies.totalResults > 0 ? (
        <div className={styles.movieGrid}>
          {movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2>No movies found</h2>
          <p>We couldn't find any movies in this category.</p>
        </div>
      )}
      <BottomPagination totalPages={movies.totalPages} pathName="category" />
    </main>
  );
};

export default CategoryPage;

