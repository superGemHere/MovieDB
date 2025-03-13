import { Search } from "lucide-react";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { movies } from "@/data/movies";
import styles from "./page.module.css";
import { Movie } from "@/types/movie";
import movieAPI from "@/lib/api/movies";
import PaginationControls from "@/components/PaginationControls";
import BottomPagination from "@/components/BottomPagination";
import type { Movies } from "@/types/PaginatedMovies";
import { redirect } from 'next/navigation'
import MovieSlider from "@/components/movie-slider";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1");

  const movieResults = await movieAPI.findMovie(query, page);
  const movies: Movies = Array.isArray(movieResults)
    ? { results: [], totalPages: 0, totalResults: 0 }
    : movieResults;

    let popularMovies: Movies = {} as Movies;
    
    if(query){
      if(page > movies.totalPages) {
        redirect(`/search?q=${query}&page=${movies.totalPages}`)
      }else if(page < 1) {
        redirect(`/search?q=${query}&page=1`)
      }
    }else{
      popularMovies = await movieAPI.getTrendingMovies(page) as Movies;
    }
   

  return (
    <main className={styles.main}>
      <div className={styles.searchContainer}>
        <h1 className={styles.title}>Search Movies</h1>
        <SearchBar />
      </div>

      {query
        ? <div className={styles.results}>
          <div className={styles.titleAndControls}>
              <h2 className={styles.resultsTitle}>
                {movies.results.length > 0
                  ? `Found ${movies.totalResults} results for "${query}"`
                  : `No results found for "${query}"`}
              </h2>
              <div className={styles.stats}>
                <PaginationControls pathName="search" maxPageCount={movies.totalPages}/>
                <span>
                  {movies.totalPages} {`${movies.totalPages === 1 ? "Page" : "Pages"}`}
                </span>
              </div>
            </div>
            {movies.results.length > 0
              ? <div className={styles.movieGrid}>
                  {movies.results.map(movie =>
                    <MovieCard key={movie.id} movie={movie} />
                  )}
                </div>
              : <div className={styles.noResults}>
                  <Search size={48} className={styles.noResultsIcon} />
                  <p>
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                </div>}
          </div>
        : popularMovies && (<div className={styles.trending}>
            <h2 className={styles.trendingTitle}>Popular Searches</h2>
              <MovieSlider movies={popularMovies.results} slice={20}/>
            </div>
          )}
          {query && <BottomPagination totalPages={movies.totalPages} pathName="search"/>}
    </main>
  );
}
